import { deleteImage, getPhoto } from "~/server/queries";
import { Modal } from "./modal";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";


export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(Number(photoId));
  console.log(photo);
  const uploaderInfo = await clerkClient.users.getUser(photo.userId);

  return (
    <Modal>
      <div className="flex h-full items-center justify-center gap-10  text-5xl text-white">
        <img className="w-96" src={photo.url} alt="" />
        <div className="flex flex-col">
          <h2>{photo.name}</h2>
          <p>Uploaded by {uploaderInfo.fullName}</p>
          <div>
            <form
              action={async () => {
                "use server";
                await deleteImage(Number(photo.id));
               
              }}
            >
              <Button variant={"destructive"} type="submit">
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
