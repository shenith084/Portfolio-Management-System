import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST() {
  try {
    const cookieStore = await cookies();
    // Clear the admin JWT cookie
    cookieStore.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,    // expire immediately
      path: '/',
    });

    return Response.json(
      { success: true, message: 'Logged out successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout API Error:', error);
    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
