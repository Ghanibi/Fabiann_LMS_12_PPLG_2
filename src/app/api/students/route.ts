import { NextResponse } from 'next/server';
import { INITIAL_STUDENTS } from '../../../lib/data';

let students = [...INITIAL_STUDENTS];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: students.length,
    data: students,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newStudent = {
      id: Date.now(),
      name: body.name,
      nisn: body.nisn || '006' + Math.floor(1000000 + Math.random() * 9000000),
      className: body.className || '12 PPLG 2',
      gender: (body.gender || 'L') as 'L' | 'P',
      email: body.email || 'student@student.sch.id',
      phone: body.phone || '0812-0000-0000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      status: 'Aktif' as const,
    };
    students.unshift(newStudent);
    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
