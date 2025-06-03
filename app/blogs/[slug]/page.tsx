import { PageProps } from '@/.next/types/app/blogs/[slug]/page'
import { client } from '@/sanity/lib/client'
import { PortableText, PortableTextBlock, PortableTextComponents } from '@portabletext/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface Slug {
  slug: { current: string }
}

interface Post {
  title: string,
  slug: { current: string },
  publishedAt: string,
  excerpt: string,
  body: PortableTextBlock;
  mainImage: { asset: { url: string }, alt: string },
  author: { name: string, bio: string, image: { asset: { url: string }, alt: string } }
}

interface MorePost {
  _id: string,
  title: string,
  slug: { current: string },
  publishedAt: string,
  excerpt: string,
  mainImage: { asset: { url: string }, alt: string },
  author: { name: string }
}

// interface PageProps {
//   params: {
//     slug: string;
//   };
// }

export async function generateStaticParams() {
  const slugs = await client.fetch<Slug[]>(`*[_type == "post"]{ "slug": slug.current }`)
  return slugs.map((s) => ({
    slug: s.slug,
  }))
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = await client.fetch<Post>(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      body,
      excerpt,
      mainImage {
        asset -> {
          url
        },
        alt
      },
      author -> {
        name,
        image {
          asset -> {
            url
          }
        },
        bio
      }
    }
  `, { slug: slug })

  const morePosts = await client.fetch<MorePost[]>(
    `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
      title,
      slug,
      publishedAt,
      publishedAt,
      excerpt,
      mainImage {
        asset -> { url },
        alt
      },
      author -> {
        name
      }
    }`,
    { slug }
  )

  return (
    <>
      {!post ?
        <p className="text-gray-600 text-lg">Blog not found.</p>
        :
        <>
          <Head>
            <title>{post.title} | YourSite</title>
            <meta name="description" content={post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            {post.mainImage?.asset?.url && (
              <meta property="og:image" content={post.mainImage.asset.url} />
            )}
          </Head>
          <article className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-600 mb-6">
              {post.author?.name} · {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            {post.mainImage?.asset?.url && (
              <div className='w-full aspect-video relative'>
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  className="rounded mb-6"
                  fill
                />
              </div>
            )}
            <PortableText value={post.body} components={components} />
          </article>
        </>
      }

      <section className="p-6 max-w-3xl mx-auto mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">More Articles</h2>
        {morePosts.length == 0 ?
          <p className="text-gray-600 text-lg">No blog posts available right now. Please check back later.</p>
          :
          <ul className="space-y-6 gap-6 flex flex-wrap">
            {morePosts.map((post) => (
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
          </ul>
        }
      </section>
    </>
  )
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={value.asset?.url}
        alt={value.alt || 'Blog image'}
        className="my-6 rounded-lg shadow-md"
      />
    ),
    code: ({ value }) => (
      <pre className="bg-gray-900 text-white rounded-lg p-4 overflow-x-auto my-4 text-sm leading-snug">
        <code className={`language-${value.language ?? 'javascript'}`}>
          {value.code}
        </code>
        {value.filename && (
          <div className="text-gray-400 mt-2 text-xs italic">
            {value.filename}
          </div>
        )}
      </pre>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-4 text-wrap">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-4 text-wrap">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 text-wrap">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2 text-wrap">{children}</li>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4 text-wrap">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold my-3 text-wrap">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold my-2 text-wrap">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold my-2 text-wrap">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600 text-wrap">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="my-4 leading-relaxed text-lg text-wrap">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        className="text-blue-600 hover:underline text-wrap"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}