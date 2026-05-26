import { connectDB, getAdminByEmail, comparePassword } from '@/lib/dbService';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const admin = await getAdminByEmail(email);
    if (!admin) {
      return Response.json(
        { success: false, error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(admin, password);
    if (!isValid) {
      return Response.json(
        { success: false, error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // Create JWT
    const token = await new SignJWT({ id: admin._id.toString(), email: admin.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return Response.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login API Error:', error);
    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
