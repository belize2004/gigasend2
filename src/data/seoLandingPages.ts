export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoLandingPage = {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  cta: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  comparison: Array<{
    method: string;
    bestFor: string;
    limitation: string;
    gigaSendAngle: string;
  }>;
  faqs: SeoFaq[];
  internalLinks: Array<{
    href: string;
    label: string;
  }>;
  differentiation: string;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "send-large-files-free",
    primaryKeyword: "send large files free",
    secondaryKeywords: ["send big files for free", "free large file transfer", "transfer large files online"],
    title: "Send Large Files Free | Upload and Share Big Files Online",
    metaDescription: "Send large files free with GigaSend. Upload files up to 10GB, create a secure download link, and share files without email attachment limits.",
    h1: "Send Large Files Free",
    eyebrow: "Free large file transfer",
    intro: "Upload large files, create a secure download link, and send files that are too big for email. Free transfers support up to 10GB with 3-day file storage.",
    cta: "Start Free Transfer",
    sections: [
      { heading: "Send files too large for email", body: "Most email providers block large attachments long before you reach video, folder, or zip-file sizes. GigaSend turns the file into a download link instead." },
      { heading: "How free large file transfer works", body: "Choose your file, upload it securely, add a recipient email, and send a download link. The recipient can download the file from the link without dealing with email attachment limits." },
      { heading: "What you can send", body: "Send videos, zip files, folders, design files, exports, and other large files up to the available free transfer limit." },
    ],
    comparison: [
      { method: "Email attachment", bestFor: "Small documents", limitation: "Large files usually fail", gigaSendAngle: "Send a link instead of an attachment" },
      { method: "Cloud drive", bestFor: "Shared workspaces", limitation: "Permissions can confuse recipients", gigaSendAngle: "Simple one-time delivery" },
      { method: "GigaSend", bestFor: "Large files up to 10GB free", limitation: "Files expire after 3 days on free transfers", gigaSendAngle: "Fast path from upload to download link" },
    ],
    faqs: [
      { question: "Can I send large files for free?", answer: "Yes. GigaSend supports free transfers up to 10GB with 3-day file storage." },
      { question: "Does the recipient need an account?", answer: "No. Recipients receive a download link and can download the file from that link." },
      { question: "Can I send video files for free?", answer: "Yes, as long as the selected video fits within your available transfer limit." },
    ],
    internalLinks: [
      { href: "/send-10gb-file-free/", label: "send a 10GB file free" },
      { href: "/send-large-files-by-email/", label: "send large files by email" },
      { href: "/send-large-video-files/", label: "send large video files" },
      { href: "/secure-large-file-transfer/", label: "secure large file transfer" },
    ],
    differentiation: "Be transparent about the 10GB free limit and 3-day storage instead of burying restrictions in fine print.",
  },
  {
    slug: "send-10gb-file-free",
    primaryKeyword: "send 10GB file free",
    secondaryKeywords: ["transfer 10GB file online", "send 10GB video file", "upload 10GB file"],
    title: "Send a 10GB File Free | GigaSend",
    metaDescription: "Need to send a 10GB file? Upload your file, create a secure link, and share it online without email attachment limits.",
    h1: "Send a 10GB File Free",
    eyebrow: "10GB file transfer",
    intro: "A 10GB file is far beyond normal email attachment limits. GigaSend gives you a simple upload-and-link workflow built for files this size.",
    cta: "Send a 10GB File",
    sections: [
      { heading: "Why 10GB files cannot be emailed", body: "Email was not designed for multi-gigabyte attachments. Even if your outbox accepts a file, the recipient's mailbox often blocks it." },
      { heading: "Send a 10GB file with a link", body: "Upload the file to GigaSend and send the recipient a download link. It is cleaner than splitting files or compressing them again and again." },
      { heading: "Works for large videos and folders", body: "Use the same workflow for large video exports, zipped project folders, image sets, or client delivery packages." },
    ],
    comparison: [
      { method: "Email", bestFor: "Tiny attachments", limitation: "10GB is too large", gigaSendAngle: "Use email only to deliver the link" },
      { method: "USB drive", bestFor: "Local handoff", limitation: "Slow and physical", gigaSendAngle: "Send online in minutes" },
      { method: "GigaSend", bestFor: "10GB online delivery", limitation: "Upload speed depends on connection", gigaSendAngle: "Direct large-file transfer flow" },
    ],
    faqs: [
      { question: "Can I send a 10GB file for free?", answer: "Yes. The free plan supports transfers up to 10GB." },
      { question: "How long does a free 10GB transfer stay available?", answer: "Free transfers are stored for 3 days." },
      { question: "Can I send a 10GB video file?", answer: "Yes. Video files are supported as long as they fit within your available transfer limit." },
    ],
    internalLinks: [
      { href: "/send-large-files-free/", label: "send large files free" },
      { href: "/share-large-files-with-link/", label: "share large files with a link" },
      { href: "/send-large-video-files/", label: "send large video files" },
    ],
    differentiation: "This page maps exactly to the free product limit, making it one of the cleanest conversion pages.",
  },
  {
    slug: "send-large-files-by-email",
    primaryKeyword: "send large files by email",
    secondaryKeywords: ["email large files", "attach large files to email", "file too large for email"],
    title: "Send Large Files by Email Without Attachment Limits",
    metaDescription: "Email attachments are too small for large files. Upload your file to GigaSend and email a secure download link instead.",
    h1: "Send Large Files by Email",
    eyebrow: "Email large files",
    intro: "When a file is too large to attach, send a download link by email instead. GigaSend handles the upload and gives your recipient a simple link.",
    cta: "Email a Large File Link",
    sections: [
      { heading: "Why email attachments fail", body: "Email providers limit attachment sizes to keep inboxes fast and reliable. Large videos, folders, and zip files usually exceed those limits." },
      { heading: "Use email as the notification", body: "The better workflow is to upload the file once, then email the recipient a secure link to download it." },
      { heading: "Avoid cloud permission friction", body: "A transfer link is easier for one-time delivery than asking a client to request access to a shared drive folder." },
    ],
    comparison: [
      { method: "Direct attachment", bestFor: "Small PDFs", limitation: "Large attachments bounce", gigaSendAngle: "Avoid attachment limits" },
      { method: "Cloud folder", bestFor: "Ongoing collaboration", limitation: "Access settings can get messy", gigaSendAngle: "Simple link delivery" },
      { method: "GigaSend email link", bestFor: "Large file delivery", limitation: "Free storage expires after 3 days", gigaSendAngle: "Email the link, not the file" },
    ],
    faqs: [
      { question: "How do I send a file too large for email?", answer: "Upload it to GigaSend, then send the generated download link by email." },
      { question: "Can I attach a 2GB file to email?", answer: "Most email providers will not allow a 2GB attachment. A transfer link is a better option." },
      { question: "Can I email a large video file?", answer: "Yes. Upload the video and send the download link through email." },
    ],
    internalLinks: [
      { href: "/send-files-larger-than-2gb/", label: "send files larger than 2GB" },
      { href: "/share-large-files-with-link/", label: "share large files with a link" },
      { href: "/secure-large-file-transfer/", label: "secure file transfer links" },
    ],
    differentiation: "Frame email as the notification channel, not the transport layer.",
  },
  {
    slug: "send-large-video-files",
    primaryKeyword: "send large video files",
    secondaryKeywords: ["share large video files", "upload large video files", "best way to send large video files"],
    title: "Send Large Video Files Online | GigaSend",
    metaDescription: "Send large video files online without compression headaches. Upload your video, create a secure link, and share it with clients or teams.",
    h1: "Send Large Video Files Online",
    eyebrow: "Video file transfer",
    intro: "Large video exports are hard to email and awkward to share through messaging apps. GigaSend helps you upload full-size video files and send a clean download link.",
    cta: "Send Video Files",
    sections: [
      { heading: "Built for video-heavy workflows", body: "Send client cuts, event footage, real estate videos, social edits, production assets, or compressed delivery folders." },
      { heading: "Avoid compression issues", body: "Messaging apps often compress or block video files. A direct transfer link keeps the delivery workflow clearer." },
      { heading: "Simple client delivery", body: "Recipients get a straightforward download link instead of needing to understand drive permissions." },
    ],
    comparison: [
      { method: "Messaging app", bestFor: "Short clips", limitation: "Compression and size limits", gigaSendAngle: "Send the full file" },
      { method: "Cloud storage", bestFor: "Project collaboration", limitation: "Permissions can slow clients down", gigaSendAngle: "Cleaner one-time delivery" },
      { method: "GigaSend", bestFor: "Large video delivery", limitation: "Upload speed depends on connection", gigaSendAngle: "Large-video-first sharing" },
    ],
    faqs: [
      { question: "What is the best way to send large video files?", answer: "For most client delivery, uploading the video and sending a download link is easier than attaching it to email." },
      { question: "Can I send a large video by email?", answer: "You can send the download link by email after uploading the video to GigaSend." },
      { question: "Can clients download without signing up?", answer: "Recipients can use the download link without creating a sender account." },
    ],
    internalLinks: [
      { href: "/fast-large-file-transfer/", label: "fast large file transfer" },
      { href: "/send-10gb-file-free/", label: "send a 10GB video file free" },
      { href: "/share-large-files-with-link/", label: "share video files with a link" },
    ],
    differentiation: "Speak to creators, agencies, video editors, real estate teams, and client delivery workflows.",
  },
  {
    slug: "send-files-larger-than-2gb",
    primaryKeyword: "send files larger than 2GB",
    secondaryKeywords: ["send files over 2GB", "file too large for email", "send 2GB file"],
    title: "Send Files Larger Than 2GB Online",
    metaDescription: "Need to send files larger than 2GB? Upload large files to GigaSend and share them with a secure download link.",
    h1: "Send Files Larger Than 2GB",
    eyebrow: "Files over 2GB",
    intro: "Files larger than 2GB are too big for many email, chat, and form upload workflows. GigaSend gives you a direct large-file transfer path.",
    cta: "Send Files Over 2GB",
    sections: [
      { heading: "2GB is already too large for email", body: "Even a single video export, design package, or folder zip can cross 2GB quickly." },
      { heading: "Use a download link instead", body: "Upload the file once and send a link that your recipient can download from." },
      { heading: "Scale beyond 2GB", body: "Free transfers support up to 10GB. Paid and Enterprise options support larger transfer needs." },
    ],
    comparison: [
      { method: "Email", bestFor: "Small attachments", limitation: "2GB will not work", gigaSendAngle: "Send a download link" },
      { method: "Chat apps", bestFor: "Quick messages", limitation: "Large files may be compressed or blocked", gigaSendAngle: "Preserve transfer workflow" },
      { method: "GigaSend", bestFor: "Files larger than 2GB", limitation: "Storage expires based on plan", gigaSendAngle: "Built for big uploads" },
    ],
    faqs: [
      { question: "Can I email a file larger than 2GB?", answer: "Usually no. Uploading the file and emailing a download link is more reliable." },
      { question: "Can I send a folder larger than 2GB?", answer: "Yes. You can upload folders or zipped folders as long as they fit your available transfer limit." },
      { question: "Are large transfer links secure?", answer: "GigaSend uses secure transfer links and encrypted transport for upload and download." },
    ],
    internalLinks: [
      { href: "/send-large-files-by-email/", label: "send files too large for email" },
      { href: "/send-large-files-free/", label: "send large files free" },
      { href: "/send-10gb-file-free/", label: "send a 10GB file free" },
    ],
    differentiation: "Capture users at the exact moment they discover a hard upload or email limit.",
  },
  {
    slug: "transfer-large-files-online",
    primaryKeyword: "transfer large files online",
    secondaryKeywords: ["large file transfer", "online file transfer", "send big files online"],
    title: "Transfer Large Files Online | Fast and Secure File Sharing",
    metaDescription: "Transfer large files online with GigaSend. Upload, create a secure link, and share big files without email attachment limits.",
    h1: "Transfer Large Files Online",
    eyebrow: "Large file transfer",
    intro: "GigaSend helps you transfer large files online with a simple upload, email, and download-link workflow.",
    cta: "Transfer Large Files",
    sections: [
      { heading: "A simple online transfer workflow", body: "Select your file, upload it, add a recipient, and send a link. No attachment limit wrestling." },
      { heading: "Transfer videos, folders, and zip files", body: "Use GigaSend for the large files that normal email and messaging workflows cannot handle." },
      { heading: "Choose the right plan for the file size", body: "Start with free transfers up to 10GB, then move to paid or Enterprise plans for larger workflows." },
    ],
    comparison: [
      { method: "Email", bestFor: "Small files", limitation: "Strict attachment limits", gigaSendAngle: "Online transfer link" },
      { method: "Cloud folder", bestFor: "Long-term collaboration", limitation: "Access friction", gigaSendAngle: "One-time delivery" },
      { method: "GigaSend", bestFor: "Large online transfers", limitation: "Plan limits apply", gigaSendAngle: "Large-file-focused flow" },
    ],
    faqs: [
      { question: "How do I transfer large files online?", answer: "Upload your file to GigaSend and send the generated download link to your recipient." },
      { question: "Can I transfer large files for free?", answer: "Yes. Free transfers support up to 10GB with 3-day file storage." },
      { question: "What file types are supported?", answer: "GigaSend supports common file types including videos, folders, zip files, documents, images, and project files." },
    ],
    internalLinks: [
      { href: "/send-large-files-free/", label: "free large file transfer" },
      { href: "/fast-large-file-transfer/", label: "fast large file transfer" },
      { href: "/secure-large-file-transfer/", label: "secure large file transfer" },
    ],
    differentiation: "Use this as the broad category page and link down into more specific use cases.",
  },
  {
    slug: "share-large-files-with-link",
    primaryKeyword: "share large files with a link",
    secondaryKeywords: ["send file link", "upload file and share link", "file sharing link"],
    title: "Share Large Files With a Link | GigaSend",
    metaDescription: "Upload large files and share them with a secure download link. No large email attachments or confusing folder permissions.",
    h1: "Share Large Files With a Link",
    eyebrow: "Link-based file sharing",
    intro: "When attachments fail and cloud permissions get messy, a direct download link is the simplest way to share large files.",
    cta: "Create a File Link",
    sections: [
      { heading: "Why links beat attachments", body: "A link keeps email lightweight while still giving your recipient direct access to the large file." },
      { heading: "Simple recipient experience", body: "Recipients click the link and download the file, without chasing drive access or permission requests." },
      { heading: "Use links for videos, folders, and zip files", body: "Share the large deliverables that clients and teams need in one clean workflow." },
    ],
    comparison: [
      { method: "Attachment", bestFor: "Small files", limitation: "Fails for large files", gigaSendAngle: "Send a link instead" },
      { method: "Shared folder", bestFor: "Ongoing work", limitation: "Permission management", gigaSendAngle: "Direct delivery link" },
      { method: "GigaSend link", bestFor: "Large file handoff", limitation: "Expiration depends on plan", gigaSendAngle: "Clean link-based transfer" },
    ],
    faqs: [
      { question: "How do I create a download link for a large file?", answer: "Upload the file to GigaSend and send the generated download link." },
      { question: "Can I send the link by email?", answer: "Yes. GigaSend can email the download link to your recipient." },
      { question: "Does the recipient need an account?", answer: "No. Recipients can download from the link." },
    ],
    internalLinks: [
      { href: "/send-large-files-by-email/", label: "send large files by email" },
      { href: "/send-large-video-files/", label: "share large video files" },
      { href: "/secure-large-file-transfer/", label: "secure download links" },
    ],
    differentiation: "Focus on the clean recipient experience versus cloud-drive permission headaches.",
  },
  {
    slug: "secure-large-file-transfer",
    primaryKeyword: "secure large file transfer",
    secondaryKeywords: ["encrypted file transfer", "private large file sharing", "secure file sharing"],
    title: "Secure Large File Transfer | Share Big Files Safely",
    metaDescription: "Send large files with secure upload and download links, encrypted transport, and expiring access for safer file sharing.",
    h1: "Secure Large File Transfer",
    eyebrow: "Secure file sharing",
    intro: "Send large files with secure transfer links, encrypted transport, and expiring access so recipients get what they need without risky attachment workarounds.",
    cta: "Send Files Securely",
    sections: [
      { heading: "Security for real-world file delivery", body: "Large files often contain client work, private media, or business documents. A secure transfer flow is better than passing files through random workarounds." },
      { heading: "Expiring download access", body: "Free transfers expire after 3 days, reducing the time that links remain available." },
      { heading: "Cloudflare-backed infrastructure", body: "GigaSend is built on Cloudflare Pages and R2 to take advantage of a global edge network." },
    ],
    comparison: [
      { method: "Email attachment", bestFor: "Small non-sensitive files", limitation: "Bounces or gets forwarded", gigaSendAngle: "Controlled transfer link" },
      { method: "Public share link", bestFor: "Casual sharing", limitation: "Can remain available too long", gigaSendAngle: "Expiring access" },
      { method: "GigaSend", bestFor: "Secure large file delivery", limitation: "Advanced compliance requires Enterprise review", gigaSendAngle: "Secure transfer-first workflow" },
    ],
    faqs: [
      { question: "Is GigaSend secure?", answer: "GigaSend uses secure upload and download flows with encrypted transport and expiring links." },
      { question: "Do links expire?", answer: "Yes. Free transfer links expire after 3 days. Paid retention depends on the plan." },
      { question: "Can I send client files safely?", answer: "GigaSend is designed for safer client delivery than email attachments, but compliance-heavy workflows should contact sales." },
    ],
    internalLinks: [
      { href: "/transfer-large-files-online/", label: "transfer large files online" },
      { href: "/share-large-files-with-link/", label: "secure file links" },
      { href: "/send-large-video-files/", label: "secure video file transfer" },
    ],
    differentiation: "Avoid unsupported compliance claims and focus on practical security: TLS, expiring links, and controlled transfer flow.",
  },
  {
    slug: "fast-large-file-transfer",
    primaryKeyword: "fast large file transfer",
    secondaryKeywords: ["upload large files fast", "send big files fast", "high speed file transfer"],
    title: "Fast Large File Transfer | Upload and Share Big Files",
    metaDescription: "Send large files faster with direct upload, resumable transfer support, and simple download links for recipients.",
    h1: "Fast Large File Transfer",
    eyebrow: "Fast file uploads",
    intro: "Large transfers are only useful when uploads and downloads keep moving. GigaSend uses multipart upload, pause/resume controls, and Cloudflare-backed delivery.",
    cta: "Start Fast Transfer",
    sections: [
      { heading: "What affects large file speed", body: "Upload speed depends on your connection, file size, network conditions, and the transfer method." },
      { heading: "Multipart uploads for large files", body: "GigaSend breaks large uploads into parts, which improves reliability and makes very large transfers more manageable." },
      { heading: "Pause and resume uploads", body: "If a connection changes or the upload needs to stop, pause/resume support helps reduce wasted progress." },
    ],
    comparison: [
      { method: "Browser attachment", bestFor: "Small files", limitation: "Not built for huge files", gigaSendAngle: "Multipart upload flow" },
      { method: "Cloud sync", bestFor: "Background syncing", limitation: "Can be hard to track delivery", gigaSendAngle: "Explicit transfer status" },
      { method: "GigaSend", bestFor: "Fast large file handoff", limitation: "Speed still depends on sender connection", gigaSendAngle: "Built around big transfer reliability" },
    ],
    faqs: [
      { question: "How can I send large files faster?", answer: "Use a dedicated transfer workflow, keep your browser open, and use a stable connection. GigaSend handles multipart upload behind the scenes." },
      { question: "Can I pause and resume uploads?", answer: "Yes. GigaSend supports pausing and resuming large uploads." },
      { question: "What affects download speed?", answer: "Recipient download speed depends on their connection and network route, while GigaSend uses Cloudflare-backed infrastructure for delivery." },
    ],
    internalLinks: [
      { href: "/send-large-video-files/", label: "fast video file transfer" },
      { href: "/transfer-large-files-online/", label: "transfer large files online" },
      { href: "/secure-large-file-transfer/", label: "secure and fast transfer" },
    ],
    differentiation: "Use real product features: multipart upload, pause/resume, and Cloudflare/R2 architecture.",
  },
  {
    slug: "dropbox-transfer-alternative",
    primaryKeyword: "Dropbox Transfer alternative",
    secondaryKeywords: ["Dropbox transfer limit", "alternative to Dropbox Transfer", "send large files without Dropbox"],
    title: "Dropbox Transfer Alternative for Large File Delivery",
    metaDescription: "Need a Dropbox Transfer alternative? GigaSend helps you send large files with simple links, secure delivery, and large-file-focused workflows.",
    h1: "Dropbox Transfer Alternative",
    eyebrow: "Alternative file transfer workflow",
    intro: "If you want a simpler way to send large files without managing shared folders or storage permissions, GigaSend gives you direct upload-to-link delivery.",
    cta: "Try GigaSend",
    sections: [
      { heading: "Why look for an alternative?", body: "Many users want file delivery, not a full cloud storage workflow. A transfer-first tool can be simpler for one-time client handoffs." },
      { heading: "Direct large-file delivery", body: "Upload a file, send a link, and let the recipient download it without navigating a shared workspace." },
      { heading: "Built for large file use cases", body: "GigaSend supports large videos, zipped folders, project exports, and Enterprise workflows up to 5TB single files." },
    ],
    comparison: [
      { method: "Dropbox-style storage", bestFor: "Ongoing shared folders", limitation: "Permissions and storage structure can be overkill", gigaSendAngle: "Direct transfer link" },
      { method: "Email attachment", bestFor: "Small files", limitation: "Large files fail", gigaSendAngle: "Email the transfer link" },
      { method: "GigaSend", bestFor: "Large one-time delivery", limitation: "Not a full shared-drive replacement", gigaSendAngle: "Purpose-built transfer flow" },
    ],
    faqs: [
      { question: "What is a good Dropbox Transfer alternative?", answer: "For simple large-file delivery, GigaSend is a transfer-first alternative that creates direct download links." },
      { question: "Can I send large files without Dropbox?", answer: "Yes. Upload files to GigaSend and share the generated download link." },
      { question: "Does GigaSend support video files?", answer: "Yes. GigaSend supports large video files within your available transfer limit." },
    ],
    internalLinks: [
      { href: "/send-large-files-free/", label: "send large files free" },
      { href: "/share-large-files-with-link/", label: "share large files with a link" },
      { href: "/send-large-video-files/", label: "send large video files" },
    ],
    differentiation: "Compare workflows without making unverified claims about competitor limits. Position GigaSend as direct delivery, not cloud storage.",
  },
];

export const seoLandingPageMap = new Map(seoLandingPages.map((page) => [page.slug, page]));
