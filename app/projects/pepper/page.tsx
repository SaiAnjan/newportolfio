import Image from "next/image";
import Link from "next/link";

export default function PepperPage() {
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
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Pepper</h1>
            <p className="text-sm text-gray-500 mb-8">2019 • 5 min read</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-12">
            <Image
              src="/images/pepper.png"
              alt="Pepper Project"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-base leading-relaxed text-gray-700">
                Pepper is a design project focused on creating engaging user experiences. The project explores innovative interaction patterns and user interface design principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Design Approach</h2>
              <p className="text-base leading-relaxed text-gray-700">
                This project emphasizes user-centered design and explores how thoughtful interface design can enhance user engagement and satisfaction.
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
