import { getPhoto } from "~/server/queries";

export default async function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const photo = await getPhoto(photoId);
  return <div >
    <img src={photo.url} alt="" />
  </div>;
}
