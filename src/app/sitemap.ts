import { MetadataRoute } from 'next'
import productsData from "@/data/products.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.davidhobby.vn'

  const getAlternates = (path: string) => ({
    languages: {
      'vi': `${baseUrl}/vi${path}`,
      'en': `${baseUrl}/en${path}`,
      'x-default': `${baseUrl}/vi${path}`,
    }
  });

  const paths = [
    { path: '', priority: 1 },
    { path: '/products', priority: 0.8 }
  ];

  const staticRoutes: MetadataRoute.Sitemap = paths.flatMap(({ path, priority }) => [
    { 
      url: `${baseUrl}/vi${path}`, 
      lastModified: new Date(), 
      changeFrequency: 'daily', 
      priority,
      alternates: getAlternates(path)
    },
    { 
      url: `${baseUrl}/en${path}`, 
      lastModified: new Date(), 
      changeFrequency: 'daily', 
      priority,
      alternates: getAlternates(path)
    }
  ]);

  const productRoutes: MetadataRoute.Sitemap = productsData.flatMap((product) => {
    const path = `/products/${product.id}`;
    return [
      {
        url: `${baseUrl}/vi${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: getAlternates(path)
      },
      {
        url: `${baseUrl}/en${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: getAlternates(path)
      }
    ];
  });

  return [...staticRoutes, ...productRoutes]
}
