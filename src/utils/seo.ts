import { Metadata } from "next";

const siteUrl = 'https://www.davidhobby.vn';

type SEOProps = {
  title?: string;
  description?: string;
  path: string; // The path without the locale, e.g., '', '/products', '/products/1'
  openGraph?: Metadata['openGraph'];
};

export function generateSEOMetadata({ title, description, path, openGraph }: SEOProps): Metadata {
  const urlPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath = urlPath === '/' ? '' : urlPath;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/vi${cleanPath}`,
      languages: {
        'vi': `${siteUrl}/vi${cleanPath}`,
        'en': `${siteUrl}/en${cleanPath}`,
        'x-default': `${siteUrl}/vi${cleanPath}`,
      },
    },
    openGraph: {
      ...openGraph,
      url: `${siteUrl}/vi${cleanPath}`,
    },
  };
}
