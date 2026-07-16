import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { createCalendarEvent } from '../../../lib/google-calendar';

async function handlePaymentSuccess(request: Request) {
  const { searchParams } = new URL(request.url);
  const cookieStore = cookies();
  const checkoutIdFromCookie = cookieStore.get('ventipay_checkout_id')?.value;
  let checkoutId = searchParams.get('checkout_id') || searchParams.get('id') || checkoutIdFromCookie;

  let rawBody = '';
  if (request.method === 'POST') {
    try {
      const contentType = request.headers.get('content-type') || '';
      rawBody = await request.text(); // LEEMOS TODO COMO TEXTO PRIMERO
      if (contentType.includes('application/json')) {
        const body = JSON.parse(rawBody);
        checkoutId = checkoutId || body.id || body.checkout_id;
      } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
        const formData = new URLSearchParams(rawBody);
        checkoutId = checkoutId || formData.get('id')?.toString() || formData.get('checkout_id')?.toString() || null;
      }
    } catch (e) {
      console.error("Error leyendo body del POST", e);
    }
  }

  // Si por alguna razón no viene el ID, redirigimos al inicio con error
  if (!checkoutId) {
    const qs = searchParams.toString();
    const debugInfo = `method_${request.method}_qs_${qs || 'empty'}_body_${rawBody.substring(0, 50) || 'empty'}`;
    return NextResponse.redirect(new URL(`/agendar?error=missing_checkout&debug_qs=${encodeURIComponent(debugInfo)}`, request.url), 303);
  }

  try {
    // 1. Verificar el pago con Ventipay
    const ventipayRes = await fetch(`https://api.ventipay.com/v1/checkouts/${checkoutId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.VENTIPAY_SECRET_KEY}`,
        'Accept': 'application/json'
      }
    });

    const checkout = await ventipayRes.json();

    if (!ventipayRes.ok) {
      console.error("Error obteniendo checkout desde Ventipay:", checkout);
      return NextResponse.redirect(new URL('/agendar?error=ventipay_error', request.url), 303);
    }

    // El estado ideal en VentiPay es 'paid', aunque dependiendo del medio puede ser 'authorized'
    if (checkout.status !== 'paid' && checkout.status !== 'authorized') {
      return NextResponse.redirect(new URL('/agendar?error=payment_not_completed', request.url), 303);
    }

    // 2. Extraer metadata
    const metadata = checkout.metadata || {};
    const { name, email, phone, reason, date, time } = metadata;

    if (!name || !email) {
       // Falta metadata
       return NextResponse.redirect(new URL('/agendar?error=missing_metadata', request.url), 303);
    }

    // 3. Crear el evento en Google Calendar
    try {
      await createCalendarEvent({ name, email, phone, reason, date, time });
    } catch (calendarError) {
      console.error('No se pudo crear el evento en el calendario:', calendarError);
    }

    // 4. Enviar el correo de confirmación con Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const senderEmail = process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev';

    await resend.emails.send({
      from: `psychologic <${senderEmail}>`,
      to: email, 
      subject: '¡Pago recibido! Confirmación de tu sesión - psychologic.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4b694b; margin: 0;">psychologic.</h1>
          </div>
          
          <div style="background-color: #f4f7f4; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
            <h2 style="color: #2b392b; margin-top: 0;">¡Hola ${name}!</h2>
            <p style="font-size: 16px; line-height: 1.5;">
              Hemos recibido tu pago exitosamente. Tu sesión ya se encuentra confirmada y agendada en el sistema.
            </p>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #4b694b; margin-top: 0; margin-bottom: 15px;">Detalles de tu sesión:</h3>
              <p style="margin: 5px 0;"><strong>Fecha:</strong> ${date}</p>
              <p style="margin: 5px 0;"><strong>Hora:</strong> ${time}</p>
            </div>
            
            <p style="font-size: 15px; line-height: 1.5; color: #64748b;">
              Pronto te contactaremos a través de tu correo o teléfono registrado (${phone}) para enviarte el enlace seguro de la videollamada.
            </p>
          </div>
          
          <div style="text-align: center; font-size: 13px; color: #94a3b8;">
            <p>Este es un correo automático. Por favor no respondas a esta dirección.</p>
          </div>
        </div>
      `,
    });

    // 5. Redirigir a la página de éxito usando 303 See Other para forzar método GET en el navegador
    return NextResponse.redirect(new URL('/agendar/exito', request.url), 303);

  } catch (error) {
    console.error("Error crítico en payment-success:", error);
    return NextResponse.redirect(new URL('/agendar?error=server_error', request.url), 303);
  }
}

export async function GET(request: Request) {
  return handlePaymentSuccess(request);
}

export async function POST(request: Request) {
  return handlePaymentSuccess(request);
}
