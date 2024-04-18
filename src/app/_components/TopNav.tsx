"use client";

import { SignOutButton, SignedIn, UserButton } from "@clerk/clerk-react";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "../utils/uploadthing";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const router = useRouter();
  return (
    <nav className=" p-5 text-white">
      <div className="mx-auto flex w-full max-w-6xl justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Gallery
        </Link>
        <div className="flex flex-row text-2xl font-bold text-white">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UploadButton
            className="text-sm"
              endpoint="imageUploader"
              onClientUploadComplete={() => {
                router.refresh();
              }}
            />
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
