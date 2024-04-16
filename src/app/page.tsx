import { db } from "~/server/db";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const mockImages = [
    {
      id: 1,
      url: "https://utfs.io/f/c5511b9f-c3c8-4131-9150-c44da6953b1d-1e.jpg",
    },
    {
      id: 2,
      url: "https://utfs.io/f/33e1f1ef-7190-4975-9ea9-d1cd7eaced74-1d.jpg",
    },
    {
      id: 3,
      url: "https://utfs.io/f/62d42e6b-8152-472b-9fa6-7d6044e4f283-1f.jpg",
    },
  ];

  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main>
   
      <div className="flex flex-wrap gap-4">
      {
        posts.map(post => (
          <div key={post.id}>
            {post.name}
          </div>
        ))
      }
        {[
          ...mockImages,
          ...mockImages,
          ...mockImages,
          ...mockImages,
          ...mockImages,
        ].map((image,index) => (
          <div key={index} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
