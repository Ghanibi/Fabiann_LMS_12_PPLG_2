import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    let role = 'ADMIN';
    let name = 'Fulani bin Fulano';

    if (email?.includes('teacher')) {
      role = 'TEACHER';
      name = 'Rahmania, S.Si';
    } else if (email?.includes('student')) {
      role = 'STUDENT';
      name = 'Fabian Nanday';
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
        email: email || 'admin@school.com',
        name,
        role,
      },
      token: 'jwt-session-token-simulated-fabian-lms',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 400 });
  }
}
