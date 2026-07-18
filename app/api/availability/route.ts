import { NextResponse } from 'next/server';
import { getBusySlots } from '@/lib/google-calendar';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');

    if (!startParam || !endParam) {
      return NextResponse.json({ error: 'Faltan parámetros start y end' }, { status: 400 });
    }

    const timeMin = new Date(startParam);
    const timeMax = new Date(endParam);

    if (isNaN(timeMin.getTime()) || isNaN(timeMax.getTime())) {
      return NextResponse.json({ error: 'Fechas inválidas' }, { status: 400 });
    }

    const busySlots = await getBusySlots(timeMin, timeMax);

    return NextResponse.json({ busySlots });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Error al obtener disponibilidad' }, { status: 500 });
  }
}
