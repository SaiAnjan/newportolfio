import Image from "next/image";
import Link from "next/link";

export default function SummerInternshipPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="w-full bg-white fixed z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link href="/" className="text-sm text-gray-600 hover:text-black inline-flex items-center gap-2">
            <span>←</span>
            <span>Back to Projects</span>
          </Link>
        </div>
      </nav>

      <article className="pt-16">
        <header className="bg-white pb-16 pt-20">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Summer Internship</h1>
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed text-gray-600 mb-6">
              Learnings & Takeaways from a 9 week internship.
            </p>
            <p className="text-sm text-gray-500 mb-8">2019 • 6 min read</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-12">
            <Image
              src="/images/ms.png"
              alt="Summer Internship Project"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Internship Overview</h2>
              <p className="text-base leading-relaxed text-gray-700">
                This project documents my experience during a 9-week summer internship, focusing on the key learnings, challenges, and takeaways from working in a professional design environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Learnings</h2>
              <ul className="text-base leading-relaxed text-gray-700 space-y-2 list-disc list-inside">
                <li>Professional design workflow and processes</li>
                <li>Collaboration with cross-functional teams</li>
                <li>Real-world problem-solving approaches</li>
                <li>Industry best practices and methodologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Takeaways</h2>
              <p className="text-base leading-relaxed text-gray-700">
                The internship provided valuable insights into the design industry, helping me understand how design decisions are made in professional settings and how to effectively communicate design ideas to stakeholders.
              </p>
            </section>
          </div>
        </main>

        <footer className="bg-white py-12 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 mb-4">Made with ❤️ in Hyderabad, India</p>
          </div>
        </footer>
      </article>
    </main>
  );
}
