import { SITE_URL } from '@/lib/constant';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;

  const { searchParams } = new URL(req.url);
  const token = searchParams.get('secret');

  if (token !== secret) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await fetch(`${SITE_URL}/blogs`, { method: 'PURGE' });

    // If body.slug exists (e.g., for a blog post)
    if (body.slug?.current) {
      const slug = body.slug.current;
      await fetch(`${SITE_URL}/blogs/${slug}`, { method: 'PURGE' });
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
