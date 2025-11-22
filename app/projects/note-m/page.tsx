import Image from "next/image";
import Link from "next/link";

export default function NoteMPage() {
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
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Note － M</h1>
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed text-gray-600 mb-6">
              Currency reader for the visually impaired.
            </p>
            <p className="text-sm text-gray-500 mb-8">2020 • 7 min read</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-12">
            <Image
              src="/images/notem.png"
              alt="Note-M Project"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-base leading-relaxed text-gray-700">
                Note-M is an assistive technology application designed to help visually impaired users identify currency notes. The project focused on creating an accessible solution that uses technology to make financial transactions more inclusive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Design Challenge</h2>
              <p className="text-base leading-relaxed text-gray-700">
                Identifying currency notes can be a significant challenge for visually impaired individuals. The challenge was to design a solution that accurately recognizes different currency denominations and communicates this information in an accessible way.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
              <ul className="text-base leading-relaxed text-gray-700 space-y-2 list-disc list-inside">
                <li>Currency recognition using image processing</li>
                <li>Audio feedback for denomination identification</li>
                <li>Accessible interface design</li>
                <li>Support for multiple currency types</li>
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
