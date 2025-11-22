import { getSubstackPosts, formatDate } from "@/lib/substack";
import Link from "next/link";

// Fetch fresh data on each request

export default async function BlogPage() {
  const posts = await getSubstackPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-12">Blog</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article key={post.guid || index} className="border-b border-gray-200 pb-8 last:border-0">
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h2 className="text-xl font-light mb-2 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h2>
                  {post.pubDate && (
                    <p className="text-sm text-gray-500 mb-3">
                      {formatDate(post.pubDate)}
                    </p>
                  )}
                  {post.contentSnippet && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {post.contentSnippet.substring(0, 200)}...
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

