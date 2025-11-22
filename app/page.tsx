import Image from "next/image";
import Link from "next/link";
import { getSubstackPosts, formatDate } from "@/lib/substack";
import { Newsletter } from "@/components/newsletter";

// Fetch fresh data on each request

export default async function Home() {
  const blogPosts = await getSubstackPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-light mb-2">Sai Anjan</h1>
          <p className="text-lg font-light text-gray-600">
            UX Designer
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Product Designer with over 5 years of experience in UX research and interaction design. 
            Focused on creating user-centered designs and solving complex problems through innovation.
          </p>
        </div>

        {/* Selected Projects */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            Selected Projects
          </h2>
          <div className="space-y-8">
            <Link href="/projects/gpay" className="block group">
              <h3 className="text-xl font-light mb-1 group-hover:opacity-70 transition-opacity">
                Gpay + Wallet
              </h3>
              <p className="text-sm text-gray-500">
                Payment and wallet experience design
              </p>
            </Link>
            <Link href="/projects/mindhouse" className="block group">
              <h3 className="text-xl font-light mb-1 group-hover:opacity-70 transition-opacity">
                Mindhouse live class filtering
              </h3>
              <p className="text-sm text-gray-500">
                Enhanced filtering and discovery experience
              </p>
            </Link>
            <Link href="/projects/teaching-strategies" className="block group">
              <h3 className="text-xl font-light mb-1 group-hover:opacity-70 transition-opacity">
                Teaching Strategies
              </h3>
              <p className="text-sm text-gray-500">
                Educational platform design
              </p>
            </Link>
          </div>
        </section>

        {/* All Projects */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            Projects
          </h2>
          <div className="space-y-6">
            <Link href="/projects/gpay" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Gpay + Wallet</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2024</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/mindhouse" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Mindhouse live class filtering</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2022</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/teaching-strategies" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Teaching Strategies</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2020</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/note-m" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Note － M</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2020</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/tulasi" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Tulasi</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2020</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/summer-internship" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Summer Internship</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2019</span>
              </div>
              <p className="text-sm text-gray-500">6 min read</p>
            </Link>
            <Link href="/projects/pepper" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Pepper</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2019</span>
              </div>
              <p className="text-sm text-gray-500">5 min read</p>
            </Link>
            <a
              href="https://www.behance.net/gallery/82968779/Co-Cards-Interactive-learning-tool-for-high-school-kids"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Co － Cards</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2018</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </a>
            <Link href="/projects/evaahan" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">e － Vaahan</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2018</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/anjani-font" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Anjani Font</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2018</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <a
              href="https://www.behance.net/gallery/89177421/1000-days-of-Transforming-The-Motherland"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">AP Jhanmabhoomi magazine design</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2017</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </a>
          </div>
        </section>

        {/* Interaction Techniques */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            Interaction Techniques
          </h2>
          <a
            href="https://v0.dev/chat/dual-thumb-range-slider-fkMr4tGGxdp"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
              <h3 className="text-lg font-light">Dual Thumb Range Slider</h3>
              <span className="text-sm text-gray-500 sm:ml-4">2024</span>
            </div>
            <p className="text-sm text-gray-500">Interactive demo</p>
          </a>
        </section>

        {/* Work Experience */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            Work Experience
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Design Manager</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2024 - Present</span>
              </div>
              <p className="text-sm text-gray-600">DuPont India</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Design Manager</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2022 - 2024</span>
              </div>
              <p className="text-sm text-gray-600">Jio Platforms Limited</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Interaction Designer (Consultant)</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2020 - 2022</span>
              </div>
              <p className="text-sm text-gray-600">Dell</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">Product Designer</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2020</span>
              </div>
              <p className="text-sm text-gray-600">Mindhouse</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">UX Design Intern</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2019</span>
              </div>
              <p className="text-sm text-gray-600">Microsoft</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="text-lg font-light">UI/UX Designer</h3>
                <span className="text-sm text-gray-500 sm:ml-4">2017 - 2018</span>
              </div>
              <p className="text-sm text-gray-600">TCS</p>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            Blog
          </h2>
          {blogPosts.length === 0 ? (
            <p className="text-sm text-gray-500">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-4">
              {blogPosts.slice(0, 4).map((post, index) => (
                <Link
                  key={post.guid || index}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h3 className="text-lg font-light mb-1 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  {post.pubDate && (
                    <p className="text-sm text-gray-500">
                      {formatDate(post.pubDate)}
                    </p>
                  )}
                </Link>
              ))}
              {blogPosts.length > 4 && (
                <Link
                  href="/blog"
                  className="text-sm text-gray-500 hover:text-gray-700 inline-block mt-2"
                >
                  View all posts →
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Newsletter */}
        <Newsletter />

        {/* Connect */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            Connect
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Feel free to contact me at{" "}
            <a
              href="mailto:saianjan.margani@gmail.com"
              className="text-black hover:underline"
            >
              saianjan.margani@gmail.com
            </a>
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://substack.com/@saianjan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Substack
            </a>
            <a
              href="https://x.com/Dhaathre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/saianjan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://medium.com/@saianjan.margani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Medium
            </a>
            <a
              href="https://dribbble.com/saianjan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Dribbble
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sai Anjan. Made with ❤️ in Hyderabad, India.
          </p>
        </footer>
      </div>
    </main>
  );
}
