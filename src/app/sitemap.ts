import { getCategoriesDataCached } from "@/utils/getposts";
import { MetadataRoute } from "next";

export const revalidate = 604800; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { noFilteredPosts } = await getCategoriesDataCached();

  const postEntries: MetadataRoute.Sitemap = noFilteredPosts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.id}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
    },
    ...postEntries,
  ];
}

// lastModified: new Date(categories.updatedAt),
// changeFrequency:,
// priority:,
