import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    try {
      const aboutPageData = await prisma.about.findFirst({
        where: { sectionName: "abouts" },
      });
      return { success: true, data: aboutPageData };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } else if (method === 'POST') {
    try {
      const body = await readBody(event);
      const newAboutPage = await prisma.about.create({
        data: {
          sectionName: "abouts",
          title: body.title,
          subtitle: body.subtitle,
          content: body.content, // TipTap içeriği HTML olarak saklanacak
          image: body.image,
        },
      });
      return { success: true, data: newAboutPage };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } else if (method === 'PUT') {
    try {
      const body = await readBody(event);
      const updatedAboutPage = await prisma.about.update({
        where: { sectionName: "abouts" },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          content: body.content,
          image: body.image,
        },
      });
      return { success: true, data: updatedAboutPage };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } else if (method === 'DELETE') {
    try {
      await prisma.about.delete({
        where: { sectionName: "abouts" },
      });
      return { success: true, message: "About kaydı başarıyla silindi." };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } else {
    return { success: false, error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});
