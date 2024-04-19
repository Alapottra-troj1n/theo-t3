import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getPhotos } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const gallery = await getPhotos();

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
