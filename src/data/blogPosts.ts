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
    author: "Gigasend",
    body: [
      "Large files should move quickly without forcing clients or collaborators through a maze of accounts, ads, and fragile links.",
      "Gigasend is built around a simple transfer flow: upload your file directly from the browser, share a clean download link, and keep access bounded by predictable retention windows.",
      "Under the hood, files are sliced into parallel blocks in your browser, transmitted over TLS 1.3 to the nearest of 335+ global server locations, and encrypted at rest using AES-256 with zero bandwidth download fees.",
      "Because chunks are uploaded independently with automatic retry, brief Wi-Fi drops or network handoffs only retry the affected segment rather than restarting a multi-gigabyte upload from zero.",
      "For creative and engineering teams, the best file transfer experience is quiet: a 10 GB free tier with automatic 3-day expiration for quick turnarounds, and 30-day retention on paid plans for extended production handoffs.",
    ],
  },
];

export function getBlogPost(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}
