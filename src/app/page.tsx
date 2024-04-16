import { db } from "~/server/db";

export const dynamic = 'force-dynamic';

export default async function HomePage() {


const images = await db.query.images.findMany();

  
  return (
    <main>
   
      <div className="flex flex-wrap gap-4">
     
        {
          images.map(image => (
            <div className="w-48" key={image.id}>
              <img src={image.url} alt={image.name} />
              <p>{image.name}</p>
            </div>
          ))
        }
      </div>
    </main>
  );
}
