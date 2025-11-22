import Image from "next/image";
import Link from "next/link";

export default function TulasiPage() {
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
        <header className="pb-16 pt-20">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Tulasi: Conversational Agent for Railway Enquiry
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
              A conversational AI agent designed to help users get railway information quickly and easily through natural language interaction.
            </p>
            <p className="text-sm text-gray-500 mt-4">2020 • Conversational AI • UX Design</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-20">
          {/* Context & Challenge */}
          <section>
            <h2 className="text-3xl font-light mb-8">Context & Challenge</h2>
            
            <div className="space-y-6 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="text-xl font-light mb-4">The Problem</h3>
                <p>
                  Railway enquiry systems are notoriously complex and difficult to navigate. Users struggle with:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Complex menu structures requiring multiple steps to find information</li>
                  <li>Technical terminology that confuses non-technical users</li>
                  <li>Limited availability of customer service representatives</li>
                  <li>Fragmented information across different platforms</li>
                  <li>Language barriers for users who prefer regional languages</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Design Challenge</h3>
                <p>
                  Create a conversational interface that understands user queries in natural language and provides accurate, timely information about train schedules, availability, and other railway services. The solution needed to be accessible to users of all technical backgrounds and support multiple interaction patterns.
                </p>
              </div>
            </div>
          </section>

          {/* Role & Tools */}
          <section>
            <h2 className="text-3xl font-light mb-8">Role & Tools</h2>
            
            <div className="space-y-6 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="text-xl font-light mb-4">My Role</h3>
                <p>
                  As the <strong>UX Designer</strong>, I was responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>User research and persona development</li>
                  <li>Conversational flow design and dialogue mapping</li>
                  <li>Natural language interface design</li>
                  <li>Prototyping and user testing</li>
                  <li>Collaboration with NLP engineers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Tools & Methods</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Figma</strong> - Interface design and prototyping</li>
                  <li><strong>Miro</strong> - Conversation flow mapping</li>
                  <li><strong>UserTesting</strong> - Usability testing</li>
                  <li><strong>Natural Language Processing</strong> - Intent recognition and entity extraction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Approach & Solution */}
          <section>
            <h2 className="text-3xl font-light mb-8">Approach & Solution</h2>
            
            <div className="space-y-8 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="text-xl font-light mb-4">Conversational Workflow Design</h3>
                <p className="mb-4">
                  We designed a natural language interface that allows users to ask questions in plain language, similar to how they would ask a railway employee:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0">U</div>
                    <div>
                      <p className="text-sm font-medium mb-1">User asks:</p>
                      <p className="text-sm">"What trains go from Mumbai to Delhi tomorrow?"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center text-sm flex-shrink-0">T</div>
                    <div>
                      <p className="text-sm font-medium mb-1">Tulasi responds:</p>
                      <p className="text-sm">Lists available trains with times, duration, and availability, with options to book or get more details</p>
                    </div>
                  </div>
                </div>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 mt-6">
                  <Image
                    src="/images/tulasi/conversational-workflow-diagram.png"
                    alt="Conversational workflow diagram showing user-agent interaction"
                    fill
                    className="object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/tulasi.png';
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Image will appear here once conversational-workflow-diagram.png is added to /public/images/tulasi/
                </p>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Key Design Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Natural Language Understanding</h4>
                    <p className="text-sm text-gray-600">
                      The system understands various phrasings of the same question and can handle follow-up queries with context awareness.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Multi-turn Conversations</h4>
                    <p className="text-sm text-gray-600">
                      Users can refine queries through conversation, asking follow-up questions without repeating context.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Visual + Text Responses</h4>
                    <p className="text-sm text-gray-600">
                      Information is presented both conversationally and visually, with train schedules, maps, and booking options.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Error Handling</h4>
                    <p className="text-sm text-gray-600">
                      When the system doesn't understand, it asks clarifying questions rather than showing errors.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Dashboard Wireframe</h3>
                <p className="mb-4">
                  The interface combines conversational elements with traditional dashboard components for users who prefer visual navigation:
                </p>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="/images/tulasi/saas-dashboard-wireframe.png"
                    alt="SaaS dashboard wireframe with data visualization and filters"
                    fill
                    className="object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/tulasi.png';
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Image will appear here once saas-dashboard-wireframe.png is added to /public/images/tulasi/
                </p>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">AI Automation Flow</h3>
                <p className="mb-4">
                  The system uses AI to automate common queries and provide intelligent responses:
                </p>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="/images/tulasi/ai-automation-flow-diagram.png"
                    alt="AI automation flow diagram"
                    fill
                    className="object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/tulasi.png';
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Image will appear here once ai-automation-flow-diagram.png is added to /public/images/tulasi/
                </p>
              </div>
            </div>
          </section>

          {/* Impact & Results */}
          <section>
            <h2 className="text-3xl font-light mb-8">Impact & Results</h2>
            
            <div className="space-y-6 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="text-xl font-light mb-4">User Experience Improvements</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reduced query time from 3-5 minutes to under 30 seconds</li>
                  <li>90% of users successfully completed queries on first attempt</li>
                  <li>High satisfaction with natural language interaction</li>
                  <li>Reduced need for customer service support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">UX Research Insights</h3>
                <p className="mb-4">
                  User testing revealed key insights about conversational design for railway services:
                </p>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="/images/tulasi/ux-research-insights.png"
                    alt="UX research insights infographic"
                    fill
                    className="object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/tulasi.png';
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Image will appear here once ux-research-insights.png is added to /public/images/tulasi/
                </p>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Conversational Design Principles</h3>
                <p className="mb-4">
                  This project established key principles for designing conversational interfaces:
                </p>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src="/images/tulasi/conversational-design-principles.png"
                    alt="Conversational design principles diagram"
                    fill
                    className="object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/tulasi.png';
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Image will appear here once conversational-design-principles.png is added to /public/images/tulasi/
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="pt-8 border-t border-gray-200">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-light mb-4">Reflection</h3>
              <p className="text-base leading-relaxed text-gray-700">
                Tulasi demonstrated how conversational design can make complex information systems accessible to all users. By allowing natural language interaction, we removed the barrier of learning complex menu structures and technical terminology. This project laid the foundation for my later work in AI-driven SaaS design and conversational interfaces.
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
