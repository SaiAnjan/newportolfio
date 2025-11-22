import Link from "next/link";
import { getSubstackPosts, formatDate } from "@/lib/substack";
import { Newsletter } from "@/components/newsletter";

export default async function Home() {
  const blogPosts = await getSubstackPosts();

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header with Resume */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <h1 className="text-4xl font-light mb-2">Sai Anjan</h1>
            <p className="text-lg font-light text-gray-600">
              UX Designer
            </p>
          </div>
          <Link
            href="/resume"
            className="primary-button text-sm"
          >
            View Resume
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mb-20">
          <h2 className="accent-heading text-5xl md:text-6xl font-light mb-6 leading-tight">
            Experienced AI-Driven UX Designer Specializing in SaaS & Enterprise Dashboards
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
            Designing intelligent, data-driven user experiences for complex workflows. Transforming enterprise software through thoughtful AI integration and conversational design.
          </p>
        </section>

        {/* About Me */}
        <section className="mb-20">
          <h3 className="accent-heading text-2xl font-light mb-6">About</h3>
          <div className="space-y-4 text-base leading-relaxed text-gray-700 max-w-3xl">
            <p>
              I'm a Product Designer with over 5 years of experience specializing in AI-driven SaaS applications and enterprise dashboard design. My expertise lies in creating intelligent user interfaces that seamlessly integrate AI automation tools, conversational design, and data visualization.
            </p>
            <p>
              I work extensively with AI-powered tools including <strong>Copilot Studio</strong> and <strong>vibe coding</strong> to enhance user workflows and automate complex processes. My focus is on solving SaaS UX challenges through thoughtful design that balances powerful functionality with intuitive user experiences.
            </p>
            <p>
              I design for complex enterprise environments where clarity, efficiency, and intelligent automation are essential. My approach combines user research, data-driven insights, and cutting-edge AI technologies to create solutions that transform how teams work.
            </p>
          </div>
        </section>

        {/* All Projects */}
        <section className="mb-20">
          <h3 className="accent-heading text-2xl font-light mb-8">Projects</h3>
          <div className="space-y-2">
            <Link href="/projects/gpay" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Gpay + Wallet</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2024</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </Link>
            <Link href="/projects/mindhouse" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Mindhouse live class filtering</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2022</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </Link>
            <Link href="/projects/teaching-strategies" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Teaching Strategies</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2020</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </Link>
            <Link href="/projects/note-m" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Note － M</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2020</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </Link>
            <Link href="/projects/tulasi" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Tulasi</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2020</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </Link>
            <Link href="/projects/summer-internship" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Summer Internship</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2019</span>
              </div>
              <p className="meta text-sm">6 min read</p>
            </Link>
            <Link href="/projects/pepper" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Pepper</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2019</span>
              </div>
              <p className="meta text-sm">5 min read</p>
            </Link>
            <a
              href="https://www.behance.net/gallery/82968779/Co-Cards-Interactive-learning-tool-for-high-school-kids"
              target="_blank"
              rel="noopener noreferrer"
              className="project-row block"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Co － Cards</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2018</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </a>
            <Link href="/projects/evaahan" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">e － Vaahan</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2018</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </Link>
            <Link href="/projects/anjani-font" className="project-row block">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">Anjani Font</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2018</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </Link>
            <a
              href="https://www.behance.net/gallery/89177421/1000-days-of-Transforming-The-Motherland"
              target="_blank"
              rel="noopener noreferrer"
              className="project-row block"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">
                  <span className="project-link">AP Jhanmabhoomi magazine design</span>
                </h4>
                <span className="project-year text-sm sm:ml-4">2017</span>
              </div>
              <p className="meta text-sm">7 min read</p>
            </a>
          </div>
        </section>

        {/* Thought Leadership */}
        <section className="mt-16 mb-20">
          <h3 className="accent-heading text-2xl font-light mb-8">Thought Leadership</h3>
          {blogPosts.length === 0 ? (
            <p className="text-sm text-gray-500">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-6">
              {blogPosts.slice(0, 3).map((post, index) => (
                <Link
                  key={post.guid || index}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <h4 className="text-lg font-light mb-1 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h4>
                  {post.pubDate && (
                    <p className="text-sm text-gray-500">
                      {formatDate(post.pubDate)}
                    </p>
                  )}
                </Link>
              ))}
              <Link
                href="/blog"
                className="text-sm text-gray-500 inline-block mt-2"
              >
                View all posts →
              </Link>
            </div>
          )}
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-4">
              I write about AI ethics in design, SaaS UX challenges, conversational AI, and the future of enterprise software.
              Follow my writing on <a href="https://substack.com/@saianjan" target="_blank" rel="noopener noreferrer">Substack</a>.
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <div className="mt-16">
          <Newsletter />
        </div>

        {/* Contact & Social Proof */}
        <section className="mt-16 mb-16">
          <h3 className="accent-heading text-2xl font-light mb-8">Contact</h3>
          <div className="space-y-6">
            <div>
              <p className="text-base text-gray-700 mb-4">
                I'm always open to discussing new opportunities in AI-driven SaaS design, enterprise dashboard projects, or collaborative ventures.
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Email:{" "}
                <a href="mailto:saianjan.margani@gmail.com">
                  saianjan.margani@gmail.com
                </a>
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                Connect
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/saianjan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="https://substack.com/@saianjan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  Substack
                </a>
                <a
                  href="https://x.com/Dhaathre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  Twitter
                </a>
                <a
                  href="https://medium.com/@saianjan.margani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  Medium
                </a>
                <a
                  href="https://dribbble.com/saianjan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  Dribbble
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t" style={{ borderColor: 'rgba(15, 91, 70, 0.15)' }}>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sai Anjan. Made with ❤️ in Hyderabad, India.
          </p>
        </footer>
      </div>
    </main>
  );
}
