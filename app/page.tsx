import Link from "next/link";
import { getSubstackPosts, formatDate } from "@/lib/substack";
import { Newsletter } from "@/components/newsletter";
import { Banner } from "@/components/banner";
import { CaseStudyCard } from "@/components/case-study-card";

export default async function Home() {
  const blogPosts = await getSubstackPosts();

  return (
    <main className="min-h-screen">
      {/* Banner Section */}
      <Banner />

      {/* About Section */}
      <section id="about-section" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8">About</h2>
          <div className="space-y-6 text-base leading-relaxed text-gray-700">
            <p>
              I'm a Product Designer with over 5 years of experience specializing in AI-driven SaaS applications and enterprise dashboard design. My expertise lies in creating intelligent user interfaces that seamlessly integrate AI automation tools, conversational design, and data visualization.
            </p>
            <p>
              I work extensively with AI-powered tools including <strong>Copilot Studio</strong> and <strong>vibe coding</strong> to enhance user workflows and automate complex processes. My focus is on solving SaaS UX challenges through thoughtful design that balances powerful functionality with intuitive user experiences.
            </p>
            <p>
              I design for complex enterprise environments where clarity, efficiency, and intelligent automation are essential. My approach combines user research, data-driven insights, and cutting-edge AI technologies to create solutions that transform how teams work.
            </p>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-light mb-4">Key Skills & Expertise</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  AI-leveraged UX Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  SaaS & Enterprise Dashboard Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  Conversational UX & AI Interfaces
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  Copilot Studio & AI Automation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  User Research & Data-Driven Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  Complex Workflow Optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">Featured Case Studies</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="h-96">
              <CaseStudyCard
                title="Tulasi"
                tagline="Conversational AI agent for railway enquiry, simplifying complex information access through natural language interaction."
                accentColor="#6366f1"
                imageSrc="/images/tulasi.png"
                href="/projects/tulasi"
              />
            </div>
            <div className="h-96">
              <CaseStudyCard
                title="Chargeit"
                tagline="Enterprise payment solution with advanced security and workflow management for large-scale financial operations."
                accentColor="#ec4899"
                imageSrc="/images/ChargeIT/Thumbnail.png"
                href="/projects/chargeit"
                isProtected={true}
              />
            </div>
            <div className="h-96">
              <CaseStudyCard
                title="Teaching Strategies"
                tagline="Educational platform dashboard with data visualization and analytics for teaching effectiveness and student outcomes."
                accentColor="#10b981"
                imageSrc="/images/p2.png"
                href="/projects/teaching-strategies"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12">All Projects</h2>
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
        </div>
      </section>

      {/* Thought Leadership */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12">Thought Leadership</h2>
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
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Newsletter />
        </div>
      </section>

      {/* Contact & Social Proof */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Contact</h2>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sai Anjan. Made with ❤️ in Hyderabad, India.
          </p>
        </div>
      </footer>
    </main>
  );
}
