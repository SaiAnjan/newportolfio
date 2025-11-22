import Image from "next/image";
import Link from "next/link";

export default function TulasiPage() {
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
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Tulasi</h1>
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed text-gray-600 mb-6">
              A conversational agent for railway enquiry.
            </p>
            <p className="text-sm text-gray-500 mb-8">2020 • 7 min read</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-12">
            <Image
              src="/images/tulasi.png"
              alt="Tulasi Project"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-base leading-relaxed text-gray-700">
                Tulasi is a conversational AI agent designed to help users get railway information quickly and easily. The project focused on creating a natural language interface that makes railway enquiries accessible and user-friendly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Design Challenge</h2>
              <p className="text-base leading-relaxed text-gray-700">
                Railway enquiry systems can be complex and difficult to navigate. The challenge was to design a conversational interface that understands user queries and provides accurate, timely information about train schedules, availability, and other railway services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
              <ul className="text-base leading-relaxed text-gray-700 space-y-2 list-disc list-inside">
                <li>Natural language processing for railway queries</li>
                <li>Conversational interface design</li>
                <li>Real-time train schedule information</li>
                <li>User-friendly query handling</li>
              </ul>
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
