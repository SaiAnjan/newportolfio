import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WritingSourceLogo } from "@/components/writing-source-logo";
import { formatDate, getAllWritingPosts } from "@/lib/writing";

export default async function BlogPage() {
  const posts = await getAllWritingPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="mx-auto mt-6 mb-24 w-full max-w-3xl px-4 sm:mt-10">
        <header className="pb-10">
          <nav className="flex flex-col items-start gap-7 text-sm" aria-label="Blog navigation">
            <div className="space-y-1">
              <p className="text-base font-semibold tracking-tight">Sai Anjan</p>
              <p className="text-sm text-primary/80">Writing</p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-none border border-primary/20 bg-background/80 px-1 py-1">
              <Link className="rounded-none px-2 py-1 text-[15px] opacity-70 hover:bg-white hover:opacity-100" href="/">
                about
              </Link>
              <Link className="rounded-none px-2 py-1 text-[15px] font-medium text-primary" href="/blog">
                blog
              </Link>
              <Link className="rounded-none px-2 py-1 text-[15px] opacity-70 hover:bg-white hover:opacity-100" href="/#work">
                work
              </Link>
              <Link className="rounded-none px-2 py-1 text-[15px] opacity-70 hover:bg-white hover:opacity-100" href="/#contact">
                contact
              </Link>
            </div>
          </nav>
        </header>

        <section className="space-y-4 pb-12">
          <h1 className="text-xl font-semibold tracking-tight">Articles</h1>
          <p className="text-sm text-foreground/70">Selected writing from this site, Substack, and Medium.</p>

          {posts.length === 0 ? (
            <p className="text-sm text-foreground/70">No posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post, index) => (
                <article key={`${post.source}-${post.guid || index}`}>
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md bg-background/85 p-4 transition-colors hover:bg-white"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium capitalize text-foreground/80">
                        <WritingSourceLogo source={post.source} />
                        {post.source}
                      </span>
                      {post.pubDate && <p className="text-xs text-foreground/60">{formatDate(post.pubDate)}</p>}
                    </div>
                    <h2 className="mb-1 text-base font-medium">{post.title}</h2>
                    {post.contentSnippet && (
                      <p className="text-sm text-foreground/70">
                        {post.contentSnippet.substring(0, 220)}...
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <Button asChild variant="outline" size="sm">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
