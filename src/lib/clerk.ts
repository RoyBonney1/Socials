import { clerkClient } from "@clerk/nextjs/server";

export async function getClerkUser(clerkId: string) {
  try {
    const user = await clerkClient.users.getUser(clerkId);
    return {
      id: user.id,
      name: user.fullName || user.username || "Unknown",
      username: user.username,
      imageUrl: user.imageUrl,
    };
  } catch (error) {
    console.error("Failed to fetch Clerk user:", error);
    return null;
  }
}
