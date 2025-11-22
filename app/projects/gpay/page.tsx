import Link from "next/link";

export default function GpayPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-black mb-8 inline-block"
        >
          ← Back
        </Link>
        
        <h1 className="text-4xl font-light mb-4">Gpay + Wallet</h1>
        <p className="text-sm text-gray-500 mb-8">2024 • 7 min read</p>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            This project page is being migrated. The full case study will be available soon.
          </p>
          <p className="text-sm text-gray-500">
            For now, you can view the original project documentation in the backup files.
          </p>
        </div>
      </div>
    </main>
  );
}

