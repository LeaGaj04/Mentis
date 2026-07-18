import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, reason, date, time } = body;

    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // 0. Validación y Saneamiento Básico
    if (name.length > 150 || email.length > 150 || phone.length > 50 || (reason && reason.length > 500)) {
      return NextResponse.json({ error: 'Longitud de campos excedida' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
    }

    // Para obtener la URL base real donde estamos (ej: http://localhost:3000 o https://mentis.cl)
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // 1. Crear el payload para VentiPay
    const payload = {
      currency: "clp",
      items: [
        {
          name: "Sesión Psicológica Online",
          unit_price: 19990,
          quantity: 1
        }
      ],
      description: `Agendamiento sesión ${date} a las ${time}`,
      success_url: `${origin}/api/payment-success`,
      success_url_method: "get",
      cancel_url: `${origin}/agendar?error=payment_cancelled`,
      // Guardamos TODOS los datos del formulario aquí para usarlos cuando el paciente vuelva victorioso
      metadata: {
        name,
        email,
        phone,
        reason: reason || "",
        date,
        time
      }
    };

    // 2. Hacer la petición a la API de Ventipay
    const response = await fetch('https://api.ventipay.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VENTIPAY_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      // Prevención Data Leakage: evitamos imprimir "data" completo que podría tener información interna
      console.error("Error desde Ventipay: Fallo al comunicarse con la pasarela.");
      return NextResponse.json({ error: 'Error al comunicarse con la pasarela de pagos' }, { status: 500 });
    }

    // Ventipay devuelve "url" que es donde el usuario debe ir a pagar
    const nextResponse = NextResponse.json({ url: data.url }, { status: 200 });
    
    // Guardamos el checkout ID en una cookie segura para leerla cuando Ventipay redirija de vuelta
    nextResponse.cookies.set('ventipay_checkout_id', data.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 2 // 2 horas
    });

    return nextResponse;

  } catch (error) {
    // Prevención Data Leakage
    console.error("Error interno en checkout:", error instanceof Error ? error.message : 'Error desconocido');
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
