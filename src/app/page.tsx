import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getPhotos } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const gallery = await getPhotos();

  function Images() {
    return (
      <div className="flex flex-wrap gap-4">
        {gallery.map((image) => (
        <Link key={image.id} href={`/img/${image.id}`}>
          <div className="w-48" >
            <Image src={image.url} width={300} height={300} alt="image" />
            <p>{image.name}</p>
          </div>
        </Link>
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
