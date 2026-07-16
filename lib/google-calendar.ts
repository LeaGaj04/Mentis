import { google } from 'googleapis';

/**
 * Función auxiliar para autenticar y obtener el cliente de Google Calendar.
 */
function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  // Asegurarse de que los saltos de línea en la private key (si los hay) se parsen correctamente
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Faltan credenciales de Google (GOOGLE_CLIENT_EMAIL o GOOGLE_PRIVATE_KEY)');
  }

  const auth = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey,
    ['https://www.googleapis.com/auth/calendar.events']
  );

  return google.calendar({ version: 'v3', auth });
}

/**
 * Crea un evento en Google Calendar para la sesión agendada.
 */
export async function createCalendarEvent({
  name,
  email,
  phone,
  reason,
  date,
  time,
}: {
  name: string;
  email: string;
  phone: string;
  reason?: string;
  date: string;
  time: string;
}) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  
  if (!calendarId) {
    throw new Error('Falta el GOOGLE_CALENDAR_ID en las variables de entorno');
  }

  const calendar = getCalendarClient();

  // Asumimos que la fecha viene en formato YYYY-MM-DD y la hora en HH:MM
  // Calculamos que la sesión dura 50 minutos
  const startDateTime = new Date(`${date}T${time}:00`);
  const endDateTime = new Date(startDateTime.getTime() + 50 * 60000); // +50 min

  const event = {
    summary: `Sesión: ${name}`,
    description: `Paciente: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMotivo: ${reason || 'No especificado'}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'America/Santiago', // Ajusta tu zona horaria si es necesario
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'America/Santiago',
    },
    // Añadimos asistentes para que el paciente reciba una invitación al calendario
    attendees: [
      { email: email }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // recordatorio 1 día antes
        { method: 'popup', minutes: 10 },      // recordatorio 10 min antes
      ],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
      sendUpdates: 'all', // Esto envía una notificación a los asistentes (el paciente)
    });

    return response.data;
  } catch (error) {
    console.error('Error al crear el evento en Calendar:', error);
    throw error;
  }
}
