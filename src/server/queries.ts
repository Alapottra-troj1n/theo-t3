import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getPhotos() {
  const user = auth();

  if (!user) throw new Error("Unauthorized");

  const gallery = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: (images, { eq }) => eq(images.userId, user.userId?.toString() || ""),
  });

  if (!gallery) throw new Error("No images found");

  return gallery;
}

export async function getPhoto(id: string) {
  
  const user = auth();

  if (!user) throw new Error("Unauthorized");

  const photo = await db.query.images.findFirst({
    where: (images, { eq }) =>
      eq(images.id, parseInt(id)) &&
      eq(images.userId, user.userId?.toString() || ""),
  });

  if (!photo) throw new Error("No image found");

  return photo;
}
