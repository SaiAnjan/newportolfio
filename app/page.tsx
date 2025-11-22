import Image from "next/image";
import Link from "next/link";
import { getSubstackPosts, formatDate } from "@/lib/substack";
import { Newsletter } from "@/components/newsletter";

// Fetch fresh data on each request

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
          <a
            href="/resume"
            className="text-sm text-gray-600 hover:text-black transition-colors border border-gray-300 px-4 py-2 rounded hover:border-black"
          >
            View Resume
          </a>
        </div>

        {/* Hero Section */}
        <section className="mb-20">
          <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
            Experienced AI-Driven UX Designer Specializing in SaaS & Enterprise Dashboards
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
            Designing intelligent, data-driven user experiences for complex workflows. Transforming enterprise software through thoughtful AI integration and conversational design.
          </p>
        </section>

        {/* About Me */}
        <section className="mb-20">
          <h3 className="text-2xl font-light mb-6">About</h3>
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

        {/* Featured Projects */}
        <section className="mb-20">
          <h3 className="text-2xl font-light mb-8">Featured Projects</h3>
          <div className="space-y-12">
            <div>
              <Link href="/projects/ai-saas-dashboard" className="block group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <h4 className="text-xl font-light group-hover:opacity-70 transition-opacity">
                    AI-Powered Enterprise Dashboard
                  </h4>
                  <span className="text-sm text-gray-500 sm:ml-4">2024</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Conversational design for complex enterprise workflows, featuring Copilot-style natural language interfaces and intelligent automation.
                </p>
                <p className="text-xs text-gray-500 italic">
                  AI Integration: Copilot Studio, conversational UX, automated insights, NLP-powered queries
                </p>
              </Link>
            </div>
            <div>
              <Link href="/projects/gpay" className="block group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <h4 className="text-xl font-light group-hover:opacity-70 transition-opacity">
                    Gpay + Wallet
                  </h4>
                  <span className="text-sm text-gray-500 sm:ml-4">2024</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Payment and wallet experience design with AI-powered spending insights and automated budgeting tools.
                </p>
                <p className="text-xs text-gray-500 italic">
                  AI Integration: Smart spending analysis, automated alerts, and predictive budgeting recommendations
                </p>
              </Link>
            </div>

            <div>
              <Link href="/projects/mindhouse" className="block group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <h4 className="text-xl font-light group-hover:opacity-70 transition-opacity">
                    Mindhouse Live Class Filtering
                  </h4>
                  <span className="text-sm text-gray-500 sm:ml-4">2022</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Enhanced filtering and discovery experience for meditation app with intelligent class recommendations.
                </p>
                <p className="text-xs text-gray-500 italic">
                  AI Integration: Personalized class recommendations based on user preferences and behavior patterns
                </p>
              </Link>
            </div>

            <div>
              <Link href="/projects/teaching-strategies" className="block group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <h4 className="text-xl font-light group-hover:opacity-70 transition-opacity">
                    Teaching Strategies Dashboard
                  </h4>
                  <span className="text-sm text-gray-500 sm:ml-4">2020</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Educational platform dashboard design with data visualization and analytics for teaching effectiveness.
                </p>
                <p className="text-xs text-gray-500 italic">
                  Enterprise Dashboard: Complex data visualization, analytics, and workflow optimization
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* All Projects */}
        <section className="mb-20">
          <h3 className="text-2xl font-light mb-8">Projects</h3>
          <div className="space-y-6">
            <Link href="/projects/gpay" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">Gpay + Wallet</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2024</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/mindhouse" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">Mindhouse live class filtering</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2022</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/teaching-strategies" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">Teaching Strategies</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2020</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/note-m" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">Note － M</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2020</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/tulasi" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">Tulasi</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2020</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/summer-internship" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">Summer Internship</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2019</span>
              </div>
              <p className="text-sm text-gray-500">6 min read</p>
            </Link>
            <Link href="/projects/pepper" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">Pepper</h4>
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
                <h4 className="text-lg font-light">Co － Cards</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2018</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </a>
            <Link href="/projects/evaahan" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">e － Vaahan</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2018</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </Link>
            <Link href="/projects/anjani-font" className="block group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h4 className="text-lg font-light">Anjani Font</h4>
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
                <h4 className="text-lg font-light">AP Jhanmabhoomi magazine design</h4>
                <span className="text-sm text-gray-500 sm:ml-4">2017</span>
              </div>
              <p className="text-sm text-gray-500">7 min read</p>
            </a>
          </div>
        </section>

        {/* Thought Leadership */}
        <section className="mb-20">
          <h3 className="text-2xl font-light mb-8">Thought Leadership</h3>
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
                className="text-sm text-gray-500 hover:text-black inline-block mt-2"
              >
                View all posts →
              </Link>
            </div>
          )}
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-4">
              I write about AI ethics in design, SaaS UX challenges, conversational AI, and the future of enterprise software. 
              Follow my writing on <a href="https://substack.com/@saianjan" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">Substack</a>.
            </p>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />

        {/* Contact & Social Proof */}
        <section className="mb-16">
          <h3 className="text-2xl font-light mb-8">Contact</h3>
          <div className="space-y-6">
            <div>
              <p className="text-base text-gray-700 mb-4">
                I'm always open to discussing new opportunities in AI-driven SaaS design, enterprise dashboard projects, or collaborative ventures.
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Email:{" "}
                <a
                  href="mailto:saianjan.margani@gmail.com"
                  className="text-black hover:underline"
                >
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
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  LinkedIn
                </a>
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
            </div>
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
