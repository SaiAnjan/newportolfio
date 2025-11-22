import Image from "next/image";
import Link from "next/link";

export default function EvaahanPage() {
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
        <header className="bg-[#008080] text-white pb-16 pt-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">e-Vaahan</h1>
            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed">
              A greener way of ride-sharing inside university campus.
            </p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-12">
              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Context</h3>
                <p className="text-base leading-relaxed text-gray-700">
                  IIT Bombay spans over 2.396 million square feet, comprising clusters of academic and residential buildings interconnected by the Infinite Corridor and various streets. While the campus promotes pedestrian and bicycle movement, restrictions on motorized vehicles have led to an increased reliance on auto-rickshaws. This has resulted in higher commuting costs and safety concerns due to fast-moving vehicles. Walking the 1.8 km central street takes approximately 25 minutes, highlighting the need for a more efficient transportation solution.
                </p>
              </section>

              <div className="border-t border-gray-200"></div>

              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Design Challenge</h3>
                <p className="text-base leading-relaxed text-gray-700">
                  Under the guidance of Prof. Ravi Poovaiah, the objective was to create a digital campus by identifying and addressing pain points related to student activities, academics, transportation, and productivity. The focus was on structuring and ordering campus transportation to enhance commuting experiences.
                </p>
              </section>

              <div className="border-t border-gray-200"></div>

              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">User Research and Insights</h3>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  The campus hosts 14 academic departments, six centers, one school, and three interdisciplinary programs, accommodating approximately 5,600 students. Despite the availability of personal bicycles and auto-rickshaws, the latter's high costs and limited availability during peak hours posed challenges.
                </p>
                
                <h4 className="text-base font-semibold text-gray-900 mb-3 mt-6">Existing Bike-Sharing Services</h4>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  Services like PEDL by Zoomcar and CYCLO by Yulu were introduced on campus, offering bike-sharing options through mobile applications. However, user experiences revealed several issues:
                </p>
                
                <h5 className="text-sm font-semibold text-gray-900 mb-2 mt-4">CYCLO by Yulu</h5>
                <ul className="text-base leading-relaxed text-gray-700 space-y-1 list-disc list-inside mb-4">
                  <li>Dependence on active Bluetooth connectivity</li>
                  <li>Frequent errors during pausing and ending rides</li>
                  <li>Unrecognized bike zones</li>
                  <li>Long buffer time for unlocking after resuming rides</li>
                </ul>

                <h5 className="text-sm font-semibold text-gray-900 mb-2 mt-4">PEDL by Zoomcar</h5>
                <ul className="text-base leading-relaxed text-gray-700 space-y-1 list-disc list-inside mb-4">
                  <li>Better connectivity than CYCLO but similar issues</li>
                  <li>Limited to Android users, excluding iOS users</li>
                </ul>

                <p className="text-base leading-relaxed text-gray-700 mt-4">
                  Many students spend over 60 minutes daily commuting between hostels and academic buildings. To save time, they often resort to hiring auto-rickshaws or using personal bikes, indicating a demand for a faster, cost-effective, and eco-friendly commuting alternative.
                </p>
              </section>

              <div className="border-t border-gray-200"></div>

              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Design Intervention</h3>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  Drawing inspiration from global bike-sharing models and considering the limitations of existing services, the team proposed e-Vaahan—a campus-exclusive ride-sharing system with the following features:
                </p>
                
                <h4 className="text-base font-semibold text-gray-900 mb-3 mt-6">RFID-Based Access</h4>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  Utilizing students' existing RFID identity cards to unlock bikes, eliminating the need for constant mobile application engagement.
                </p>

                <h4 className="text-base font-semibold text-gray-900 mb-3 mt-6">Integrated Interface Module</h4>
                <p className="text-base leading-relaxed text-gray-700 mb-2">
                  A device attached to the bike comprising:
                </p>
                <ul className="text-base leading-relaxed text-gray-700 space-y-1 list-disc list-inside">
                  <li>RFID Card Reader: For user authentication and access</li>
                  <li>LED Indicators: Providing visual feedback on bike availability and status</li>
                  <li>Interactive Screen: Facilitating actions such as starting, pausing, and ending rides</li>
                </ul>
              </section>

              <div className="border-t border-gray-200"></div>

              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Prototyping and User Feedback</h3>
                <p className="text-base leading-relaxed text-gray-700 mb-4">
                  Low-fidelity wireframes were developed to visualize the user interface and interactions.
                </p>
                
                <h4 className="text-base font-semibold text-gray-900 mb-3 mt-6">Key User Feedback</h4>
                <p className="text-base leading-relaxed text-gray-700 mb-2">
                  Positive Aspects:
                </p>
                <ul className="text-base leading-relaxed text-gray-700 space-y-1 list-disc list-inside mb-4">
                  <li>Appreciation for minimizing mobile dependency</li>
                  <li>Leveraging existing ID cards for access</li>
                </ul>
                
                <p className="text-base leading-relaxed text-gray-700 mb-2">
                  Areas for Improvement:
                </p>
                <ul className="text-base leading-relaxed text-gray-700 space-y-1 list-disc list-inside mb-4">
                  <li>Desire for more engaging and playful interface elements</li>
                </ul>

                <p className="text-base leading-relaxed text-gray-700 mt-4">
                  In response, the interface was redesigned to incorporate youthful illustrations and language aligned with the student community, enhancing user engagement.
                </p>
              </section>

              <div className="border-t border-gray-200"></div>

              <section>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Conclusion</h3>
                <p className="text-base leading-relaxed text-gray-700">
                  e-Vaahan presents a tailored solution to IIT Bombay's campus commuting challenges by offering an economical, eco-friendly, and user-centric bike-sharing system. By integrating RFID technology and focusing on intuitive design, the project aims to enhance the daily commuting experience of students, promoting sustainability and efficiency.
                </p>
              </section>
            </div>

            <div className="space-y-6">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/images/evaahan.png"
                  alt="e-Vaahan Project"
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
