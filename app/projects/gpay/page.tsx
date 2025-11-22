import Image from "next/image";
import Link from "next/link";

export default function GpayPage() {
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
        <header className="bg-[#1A73E8] text-white pb-16 pt-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Google Pay + Wallet</h1>
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed">
              Driving Google Wallet Adoption in India: Addressing Trust and Usability
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Text Column */}
            <div className="space-y-12">
              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Context</h3>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  My journey with digital payments took a challenging turn when I recently managed both my and my sister's savings—around five lakhs—in a single account. Confident in my budgeting skills, I relied on digital payments through UPI apps. But over time, the ease of these transactions led me to overspend, unintentionally depleting the savings. This personal experience highlighted the subtle behavioral shift digital payments can cause, pushing me to explore ways to support users in more mindful spending.
                </p>
              </section>

              <div className="border-t border-gray-200"></div>

              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Design Challenge</h3>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  In India, UPI has already established a seamless, cashless experience, and many users rely on it for everyday transactions. Introducing a digital wallet alongside UPI is an ambitious move, especially since wallet usage is largely a Western behavior. Indian users tend to prefer direct, bank-linked payments, with many feeling that a separate wallet adds complexity. However, I see an opportunity here to bridge this gap by tailoring Google Wallet for Indian users, focusing on trust, simplicity, and financial education.
                </p>
              </section>

              <div className="border-t border-gray-200"></div>

              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">User Research</h3>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  To understand user behaviors and pain points, I conducted interviews with 15 users across different age groups and financial backgrounds. Key findings included:
                </p>
                <ul className="text-base leading-relaxed text-gray-700 space-y-2 list-disc list-inside">
                  <li>Users prefer direct bank transactions over wallets due to trust issues</li>
                  <li>Many find wallet setup and maintenance cumbersome</li>
                  <li>Users want better visibility into their spending patterns</li>
                  <li>Security concerns are a major barrier to wallet adoption</li>
                </ul>
              </section>

              <div className="border-t border-gray-200"></div>

              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Solution</h3>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  Based on the research, I proposed several key features for Google Wallet:
                </p>
                <ul className="text-base leading-relaxed text-gray-700 space-y-2 list-disc list-inside mb-6">
                  <li>Simplified onboarding with bank verification</li>
                  <li>Smart spending insights and alerts</li>
                  <li>Budgeting tools integrated with UPI</li>
                  <li>Enhanced security features with biometric authentication</li>
                </ul>
                <blockquote className="border-l-4 border-[#1A73E8] pl-6 py-4 my-6">
                  <p className="text-xl font-semibold leading-relaxed text-gray-900">
                    This case study addresses the unique factors influencing Indian users' adoption of digital wallets. My goal is to create a solution that doesn't just provide convenience but actively supports healthier financial behaviors in an emerging digital economy.
                  </p>
                </blockquote>
              </section>
            </div>

            {/* Media Column */}
            <div className="space-y-6">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/images/gpay.png"
                  alt="Google Pay + Wallet Project"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-500 italic">
                Project images will be added during full content migration.
              </p>
            </div>
          </div>
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
