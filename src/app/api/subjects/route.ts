import { NextResponse } from 'next/server';
import { INITIAL_SUBJECTS } from '../../../lib/data';

let subjects = [...INITIAL_SUBJECTS];

export async function GET() {
  return NextResponse.json({
    success: true,
    total: subjects.length,
    data: subjects,
  });
}
