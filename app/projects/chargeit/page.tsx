import Link from "next/link";
import Image from "next/image";

export default function ChargeitPage() {
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
            <h1 className="project-title-link animated-heading text-5xl md:text-6xl font-light mb-6 leading-tight">
              Chargeit: Enterprise Payment Solution
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
              A comprehensive payment platform designed for enterprise clients with advanced security and workflow management.
            </p>
            <p className="text-sm text-gray-500 mt-4">2024 • Enterprise SaaS • Payment Systems</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-20">
          <section className="fade-up" style={{ animationDelay: '100ms' }}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mb-8">
              <Image
                src="/images/ChargeIT/Thumbnail.png"
                alt="Chargeit project thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <div className="info-card">
              <p className="text-base leading-relaxed text-gray-700">
                This project is protected by an NDA. Detailed case study content will be available upon request with proper authorization.
              </p>
            </div>
          </section>
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


