import Link from 'next/link'
import Head from 'next/head'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'

interface Post {
  _id: string,
  title: string,
  slug: { current: string },
  publishedAt: string,
  excerpt: string,
  mainImage: { asset: { url: string }, alt: string },
  author: { name: string }
}

export default async function BlogIndex() {
  const posts = await client.fetch<Post[]>(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage {
        asset -> {
          url
        },
        alt
      },
      author -> {
        name
      }
    }
  `)

  return (
    <>
      <Head>
        <title>Blog | YourSite</title>
        <meta name="description" content="Read the latest articles and updates on YourSite." />
      </Head>
      <main className="p-6 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        {posts.length == 0 ?
          <p className="text-gray-600 text-lg">No blog posts available right now. Please check back later.</p>
          :
          <ul className="space-y-6 gap-6 flex flex-wrap">
            {posts.map((post) => (
              <li key={post._id}>
                <Link href={`/blogs/${post.slug.current}`}>
                  <div className="hover:underline cursor-pointer max-w-[300px]">
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt || post.title}
                      className="w-fulls rounded mb-6"
                      width={300}
                      height={300}
                    />
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-sm text-gray-600">
                      By {post.author?.name} · {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2">{post.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>}
      </main>
    </>
  )
}
