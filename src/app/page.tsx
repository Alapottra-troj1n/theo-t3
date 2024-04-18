import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";


export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = auth();
  console.log(user)
  const gallery = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    where: (images, { eq }) => eq(images.userId, user.userId?.toString() || ''),
  });



  function Images() {
    return (
      <div className="flex flex-wrap gap-4">
        {gallery.map((image) => (
          <div className="w-48" key={image.id}>
            <img src={image.url} alt={image.name} />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="mx-auto mt-10 flex w-full max-w-6xl justify-center">
      <div>
        <SignedIn>
          <Images />
        </SignedIn>
        <SignedOut>
          <div className="w-full">
            <p className="text-center"> Please Sign In to view images</p>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}
