import { getPhoto } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(photoId);
  return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <img src={photo.url} alt="" />
  </div>;
}
