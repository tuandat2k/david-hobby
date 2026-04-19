import { MetadataRoute } from 'next'
import productsData from "@/data/products.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.davidhobby.vn'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/vi`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/vi/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/en/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ]

  const productRoutes: MetadataRoute.Sitemap = productsData.flatMap((product) => [
    {
      url: `${baseUrl}/vi/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }
  ])

  return [...staticRoutes, ...productRoutes]
}
