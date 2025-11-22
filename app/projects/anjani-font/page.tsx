import Image from "next/image";
import Link from "next/link";

export default function AnjaniFontPage() {
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
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Anjani Font</h1>
            <p className="text-sm text-gray-500 mb-8">2018 • 7 min read</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-8">
            <Image
              src="/images/anjani.png"
              alt="Anjani Font Project"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              For my advanced typography module, I created a Telugu font that is inspired from a Kannada novel. I used a slant calligraphic pen with a stroke of 0.5.
            </p>
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
