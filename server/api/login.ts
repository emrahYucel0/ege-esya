// server/api/login.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { defineEventHandler, readBody, setCookie } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'E-posta ve şifre gerekli',
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Geçersiz kimlik bilgileri',
    });
  }

  // Cookie ile basit bir oturum yönetimi
  setCookie(event, 'auth', JSON.stringify({ id: user.id, role: user.role }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Canlıda secure
    path: '/',
    maxAge: 60 * 60 * 24, // 1 gün
  });

  return {
    success: true,
    message: 'Giriş başarılı',
    user: { id: user.id, email: user.email, role: user.role },
  };
});