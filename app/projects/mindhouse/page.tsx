import Image from "next/image";
import Link from "next/link";

export default function MindhousePage() {
  return (
    <main className="min-h-screen">
      <nav className="w-full bg-white fixed z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link href="/" className="text-sm text-gray-600 hover:text-black inline-flex items-center gap-2">
            <span>←</span>
            <span>Back to Projects</span>
          </Link>
        </div>
      </nav>

      <article className="pt-16">
        <header className="pb-16 pt-20 fade-up">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="project-title-link animated-heading text-4xl md:text-5xl font-semibold mb-4 text-gray-900">Re-Designing Live Class Filtering</h1>
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed text-gray-600 mb-6">
              A UX case study on improving the class discovery and booking experience for Mindhouse meditation app users.
            </p>
            <a
              href="https://www.mindhouse.com/courses/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#7E58EA] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Visit Mindhouse →
            </a>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
          <section className="fade-up" style={{ animationDelay: '100ms' }}>
            <h2 className="animated-heading text-2xl font-semibold text-gray-900 mb-6">Context</h2>
            <div className="max-w-2xl">
              <p className="text-base leading-relaxed text-gray-700 mb-6">
                Mindhouse is a meditation app offering 7 different courses/techniques, with 4 courses having mini versions. Each course has different types and classes are taken by different instructors. Think of it like a university - Physics is the course, with multiple classes, different professors, and varied material in each class. The app hosts approximately 70 different classes daily.
              </p>
              <div className="info-card">
                <blockquote className="border-l-4 border-[#7E58EA] pl-6 py-4 my-0">
                  <p className="text-xl font-semibold leading-relaxed text-gray-900">
                    "Make it easier for users to choose a live class"
                  </p>
                </blockquote>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">About the App</h2>
            <div className="max-w-2xl">
              <p className="text-base leading-relaxed text-gray-700 mb-6">
                Mindhouse is a guided meditation tool (similar to Headspace) with live trainers conducting classes. I collaborated with Ashish Goel, who leads design at Mindhouse. Originally a physical studio, Mindhouse transitioned to online classes during COVID-19. The Book tab is a crucial interface, listing all scheduled classes for the week that users can book and attend.
              </p>
              <a
                href="https://apps.apple.com/in/app/mindhouse-modern-meditation/id1484471377"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#7E58EA] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity mt-4"
              >
                View in App Store →
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current Design</h2>
            <div className="max-w-2xl mb-6">
              <p className="text-base leading-relaxed text-gray-700 mb-6">
                Here's the existing live classes booking page and its components:
              </p>
            </div>
            <div className="info-card mb-6">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/images/mindhouse.png"
                  alt="Current booking page design"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="max-w-2xl">
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                With approximately 70 classes per day, users struggle to find their preferred classes. When booking, they need to consider multiple factors:
              </p>
              <ul className="space-y-3 text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7E58EA] bg-opacity-70 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">📚</span>
                  </div>
                  <span>Course name and sub-class type</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7E58EA] bg-opacity-70 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <span>Favorite instructor availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7E58EA] bg-opacity-70 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">🕐</span>
                  </div>
                  <span>Preferred time slots</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">The Redesign</h2>
            <div className="max-w-2xl mb-6">
              <p className="text-base leading-relaxed text-gray-700 mb-6">
                The new design focuses on making information discovery faster and more intuitive:
              </p>
            </div>
            <div className="info-card">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/images/mindhouse.png"
                  alt="New booking page design"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Key Improvements</h2>
            
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Day Selector</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="info-card">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src="/images/mindhouse.png"
                      alt="Old date selector"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-[#E47D78] mb-2">Before</h4>
                  <p className="text-base text-gray-700">
                    Weekly view optimized for physical classes with limited capacity.
                  </p>
                </div>
                <div className="info-card">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src="/images/mindhouse.png"
                      alt="New date selector"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-[#81C185] mb-2">After</h4>
                  <p className="text-base text-gray-700">
                    Simplified modal date picker for better space utilization and focus on today's classes.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Time Slots</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="info-card">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src="/images/mindhouse.png"
                      alt="Old time slots"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-[#E47D78] mb-2">Before</h4>
                  <p className="text-base text-gray-700">
                    Hidden in a floating action button, requiring extra clicks.
                  </p>
                </div>
                <div className="info-card">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src="/images/mindhouse.png"
                      alt="New time slots"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-[#81C185] mb-2">After</h4>
                  <p className="text-base text-gray-700">
                    Easily accessible tabs categorized by time of day for quick filtering.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-white py-12 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 mb-4">Made with ❤️ in Hyderabad, India</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://x.com/Dhaathre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                Twitter
              </a>
              <a
                href="https://dribbble.com/saianjan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
              >
                Dribbble
              </a>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
