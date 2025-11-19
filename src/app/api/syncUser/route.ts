import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  const authUser = await currentUser();
  if (!authUser) return new Response("Unauthorized", { status: 401 });

  await prisma.user.update({
    where: { clerkId: authUser.id },
    data: {
      image: authUser.imageUrl, // <— sync fresh Clerk image
    },
  });

  return Response.json({ success: true });
}
