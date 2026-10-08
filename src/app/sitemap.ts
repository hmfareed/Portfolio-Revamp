import { MetadataRoute } from 'next';
import { projectsContent } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mohammedfareed.dev';

  const projectRoutes = projectsContent.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
