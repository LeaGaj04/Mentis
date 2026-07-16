import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  // Inicializar Resend con la API key de las variables de entorno
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { name, email, phone, reason, date, time } = body;

    // Validación básica
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Aquí usamos una dirección de prueba o puedes configurar la tuya en Resend (ej: onboarding@resend.dev)
    const senderEmail = process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev';

    const data = await resend.emails.send({
      from: `psychologic <${senderEmail}>`,
      to: email, // Enviamos el correo de confirmación al paciente
      subject: 'Confirmación de tu sesión - psychologic.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4b694b; margin: 0;">psychologic.</h1>
          </div>
          
          <div style="background-color: #f4f7f4; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
            <h2 style="color: #2b392b; margin-top: 0;">¡Hola ${name}!</h2>
            <p style="font-size: 16px; line-height: 1.5;">
              Hemos recibido tu solicitud de agendamiento. Este es un espacio seguro para tu bienestar mental.
            </p>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #4b694b; margin-top: 0; margin-bottom: 15px;">Detalles de tu sesión:</h3>
              <p style="margin: 5px 0;"><strong>Fecha:</strong> ${date}</p>
              <p style="margin: 5px 0;"><strong>Hora:</strong> ${time}</p>
              <p style="margin: 5px 0;"><strong>Teléfono registrado:</strong> ${phone}</p>
            </div>
            
            <p style="font-size: 15px; line-height: 1.5; color: #64748b;">
              Nos pondremos en contacto contigo a la brevedad para confirmar los detalles de pago y enviarte el enlace seguro para la videollamada.
            </p>
            
            ${reason ? `
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #cbdccb;">
              <p style="font-size: 14px; color: #64748b; font-style: italic;">
                "Gracias por compartir brevemente tu motivo de consulta. Será tratado con absoluta confidencialidad."
              </p>
            </div>
            ` : ''}
          </div>
          
          <div style="text-align: center; font-size: 13px; color: #94a3b8;">
            <p>Este es un correo automático. Por favor no respondas a esta dirección.</p>
            <p>Si tienes dudas, contáctanos a través de nuestro sitio web.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al enviar el correo' },
      { status: 500 }
    );
  }
}
