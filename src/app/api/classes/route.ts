import { NextResponse } from 'next/server';
import { INITIAL_CLASSES } from '../../../lib/data';

let classes = [...INITIAL_CLASSES];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: classes.length,
    data: classes,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newClass = {
      id: Date.now(),
      name: body.name || 'NEW CLASS',
      grade: body.grade || 10,
      major: body.major || 'PPLG',
      isPlus: !!body.isPlus,
      totalStudents: body.totalStudents || 36,
      homeroomTeacher: body.homeroomTeacher || 'Guru Pengampu',
    };
    classes.unshift(newClass);
    return NextResponse.json({ success: true, data: newClass }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
