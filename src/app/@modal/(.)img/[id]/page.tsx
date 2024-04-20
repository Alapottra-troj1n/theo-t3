import { getPhoto } from "~/server/queries";
import { Modal } from "./modal";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(photoId);
  return (
    <Modal>
      <img src={photo.url} alt="" />
    </Modal>
  );
}
