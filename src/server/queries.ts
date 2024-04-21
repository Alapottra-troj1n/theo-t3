import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { images } from "./db/schema";

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

export async function getPhoto(id: number) {
  const user = auth();

  if (!user) throw new Error("Unauthorized");
  console.log(id,'this was inside server')

  const photo = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
console.log(photo,'after query');
  if (!photo) throw new Error("No image found");

  return photo;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  redirect("/");
}
