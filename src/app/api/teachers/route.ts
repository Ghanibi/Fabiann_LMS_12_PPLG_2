import { NextResponse } from 'next/server';
import { INITIAL_TEACHERS } from '../../../lib/data';

let teachers = [...INITIAL_TEACHERS];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: teachers.length,
    data: teachers,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTeacher = {
      id: Date.now(),
      name: body.name,
      nip: body.nip || '19900000000000',
      email: body.email || 'guru@school.sch.id',
      subject: body.subject || 'Produktif',
      gender: (body.gender || 'L') as 'L' | 'P',
      phone: body.phone || '0812-0000-0000',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      status: 'Aktif' as const,
    };
    teachers.unshift(newTeacher);
    return NextResponse.json({ success: true, data: newTeacher }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
