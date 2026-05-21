export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  author: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "secure-large-file-transfer",
    title: "Secure Large File Transfer Without the Drag",
    publishedAt: "2026-05-07",
    excerpt: "A practical look at fast, private file transfer for teams sending work that is too large for email.",
    author: "GigaSend",
    body: [
      "Large files should move quickly without forcing clients or collaborators through a maze of accounts, ads, and fragile links.",
      "GigaSend is built around a simple transfer flow: upload the file, send the link, and keep access limited by retention windows and authenticated ownership.",
      "For teams, the best file transfer experience is quiet. Clear limits, predictable expiration, and dependable delivery matter more than a crowded dashboard.",
    ],
  },
];

export function getBlogPost(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}
