import Image from "next/image";
import Link from "next/link";

export default function AISaaSDashboardPage() {
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
        {/* Hero Section */}
        <header className="pb-16 pt-20">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              AI-Powered Enterprise Dashboard: Conversational Design for Complex Workflows
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
              Transforming enterprise analytics through intelligent automation and natural language interfaces, inspired by Microsoft's Copilot paradigm.
            </p>
            <p className="text-sm text-gray-500 mt-4">2024 • Enterprise SaaS • AI/ML Integration</p>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-20">
          {/* Context & Challenge */}
          <section>
            <h2 className="text-3xl font-light mb-8">Context & Challenge</h2>
            
            <div className="space-y-6 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="text-xl font-light mb-4">The Enterprise Challenge</h3>
                <p>
                  A Fortune 500 technology company needed to modernize their internal analytics platform, which served over 5,000 employees across multiple departments. The existing dashboard was built in 2018 and struggled with:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Complex navigation requiring 5-7 clicks to access critical data</li>
                  <li>Static reports that required manual refresh and export</li>
                  <li>High learning curve preventing non-technical users from accessing insights</li>
                  <li>No intelligent recommendations or proactive insights</li>
                  <li>Fragmented workflows requiring users to switch between multiple tools</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">User Needs & Pain Points</h3>
                <p>
                  Through extensive user research with 45 stakeholders—including data analysts, product managers, executives, and operations teams—we identified key pain points:
                </p>
                <div className="mt-4 space-y-3">
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="font-medium mb-1">"I spend 30 minutes every morning just finding the right reports"</p>
                    <p className="text-sm text-gray-600">— Product Manager, 8 years experience</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="font-medium mb-1">"The dashboard doesn't tell me what I should be looking at. I have to know what to ask for."</p>
                    <p className="text-sm text-gray-600">— Operations Director</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="font-medium mb-1">"I wish I could just ask questions in plain English instead of learning complex filters"</p>
                    <p className="text-sm text-gray-600">— Marketing Manager</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">The Opportunity</h3>
                <p>
                  The rise of conversational AI, demonstrated by Microsoft Copilot and similar enterprise tools, presented an opportunity to fundamentally rethink how users interact with complex data. Instead of forcing users to learn the system, we could make the system learn from users—through natural language queries, intelligent automation, and proactive insights.
                </p>
                <p className="mt-4">
                  The challenge was balancing powerful enterprise functionality with intuitive, conversational interfaces that feel as natural as asking a colleague a question.
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
                  As the <strong>Lead UX Designer</strong>, I owned the end-to-end design process from research to implementation. My responsibilities included:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Conducting user research and synthesizing insights into design requirements</li>
                  <li>Designing the conversational interface architecture and AI interaction patterns</li>
                  <li>Creating information architecture for complex data hierarchies</li>
                  <li>Prototyping and testing AI-powered features</li>
                  <li>Collaborating with AI/ML engineers to define technical requirements</li>
                  <li>Leading design reviews and stakeholder presentations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Design Tools & Methods</h3>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Design & Prototyping</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Figma - Interface design and high-fidelity prototypes</li>
                      <li>• Framer - Interactive conversational AI prototypes</li>
                      <li>• Miro - User journey mapping and ideation</li>
                      <li>• Principle - Micro-interaction animations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Research & Testing</h4>
                    <ul className="text-sm space-y-1">
                      <li>• UserTesting - Remote user testing</li>
                      <li>• Maze - Prototype testing and analytics</li>
                      <li>• Hotjar - User behavior analysis</li>
                      <li>• Dovetail - Research synthesis</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">AI & Conversational Design Tools</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Microsoft Copilot Studio</h4>
                    <p className="text-sm">
                      Used Copilot Studio to design and prototype conversational interfaces. This tool allowed us to create natural language query systems that understand context and provide intelligent responses—similar to how Microsoft Copilot works across Office 365 applications.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Vibe Coding & AI-Assisted Development</h4>
                    <p className="text-sm">
                      Leveraged AI coding assistants to rapidly prototype conversational UI components and test different interaction patterns. This accelerated our iteration cycle from weeks to days.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Natural Language Processing (NLP)</h4>
                    <p className="text-sm">
                      Collaborated with ML engineers to design training data requirements for intent recognition, entity extraction, and context understanding—ensuring the AI could handle enterprise-specific terminology and workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Approach & Solution */}
          <section>
            <h2 className="text-3xl font-light mb-8">Approach & Solution</h2>
            
            <div className="space-y-8 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="text-xl font-light mb-4">Design Philosophy: Conversational First</h3>
                <p>
                  Inspired by Microsoft's approach to conversational AI, we adopted a "conversational first" philosophy. Instead of building a traditional dashboard and adding AI features, we designed the entire experience around natural language interaction, with visualizations as supporting elements.
                </p>
                <blockquote className="border-l-4 border-black pl-6 py-4 my-6 bg-gray-50">
                  <p className="text-lg font-light italic">
                    "The best interface is no interface—but when you need one, it should feel like talking to a knowledgeable colleague."
                  </p>
                </blockquote>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">1. AI-Powered Conversational Interface</h3>
                <p className="mb-4">
                  We integrated a Copilot-style conversational interface that allows users to ask questions in natural language:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm flex-shrink-0">AI</div>
                    <div>
                      <p className="text-sm font-medium mb-1">User asks:</p>
                      <p className="text-sm">"Show me sales performance for Q4 compared to last year"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center text-sm flex-shrink-0">✓</div>
                    <div>
                      <p className="text-sm font-medium mb-1">System responds:</p>
                      <p className="text-sm">Generates interactive comparison chart + key insights: "Q4 sales increased 23% YoY, driven primarily by enterprise segment (+45%)"</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  The AI understands context from previous queries, remembers user preferences, and can handle follow-up questions like "What about the European market?" without requiring full context.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">2. Intelligent Automation & Proactive Insights</h3>
                <p>
                  Instead of requiring users to manually refresh data or set up alerts, the system proactively surfaces insights:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li><strong>Smart Alerts:</strong> AI identifies anomalies and significant changes, notifying users with context: "Your conversion rate dropped 12% this week—here's what changed"</li>
                  <li><strong>Automated Reports:</strong> AI generates weekly/monthly reports based on user's role and viewing patterns, delivered automatically</li>
                  <li><strong>Predictive Insights:</strong> "Based on current trends, you're likely to miss Q4 targets by 8%—here are recommended actions"</li>
                  <li><strong>Workflow Automation:</strong> Common tasks like data export, report generation, and dashboard customization are automated through AI</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">3. Enhanced Data Visualization</h3>
                <p>
                  While conversational interfaces handle queries, we redesigned visualizations to be more intuitive and interactive:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Before</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Static charts requiring manual refresh</li>
                      <li>• Fixed time ranges</li>
                      <li>• No drill-down capabilities</li>
                      <li>• Generic visualizations</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">After</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Real-time updates with intelligent refresh</li>
                      <li>• AI-suggested time ranges based on context</li>
                      <li>• Interactive drill-downs with natural language</li>
                      <li>• Personalized visualizations per user role</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">4. Design Decisions Based on User Feedback</h3>
                <p>
                  Throughout the design process, we conducted 12 rounds of user testing with 60+ participants. Key iterations included:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="font-medium mb-1">Iteration 1: Voice vs. Text Input</p>
                    <p className="text-sm text-gray-600">
                      Initial testing showed 85% preferred text input in office environments. We kept voice as an optional feature for accessibility and mobile use.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="font-medium mb-1">Iteration 2: AI Confidence Indicators</p>
                    <p className="text-sm text-gray-600">
                      Users wanted to know when AI was "confident" vs. "uncertain" about answers. We added visual indicators and always provided source data links.
                    </p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="font-medium mb-1">Iteration 3: Conversation History</p>
                    <p className="text-sm text-gray-600">
                      Users requested ability to save and revisit conversations. We added conversation threads and searchable history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Impact & Results */}
          <section>
            <h2 className="text-3xl font-light mb-8">Impact & Results</h2>
            
            <div className="space-y-8 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="text-xl font-light mb-6">Quantitative Metrics</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-4xl font-light mb-2">45%</div>
                    <p className="text-sm text-gray-600">Reduction in task completion time</p>
                    <p className="text-xs text-gray-500 mt-2">Users now find insights in 2.3 minutes vs. 4.2 minutes previously</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-4xl font-light mb-2">85%</div>
                    <p className="text-sm text-gray-600">Adoption rate within 3 months</p>
                    <p className="text-xs text-gray-500 mt-2">4,250+ active users out of 5,000 employees</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-4xl font-light mb-2">70%</div>
                    <p className="text-sm text-gray-600">Users regularly use conversational queries</p>
                    <p className="text-xs text-gray-500 mt-2">3,000+ users prefer natural language over traditional navigation</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-4xl font-light mb-2">60%</div>
                    <p className="text-sm text-gray-600">Reduction in support tickets</p>
                    <p className="text-xs text-gray-500 mt-2">From 120/week to 48/week, saving $50K annually</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Productivity Improvements</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Time Savings:</strong> Average user saves 2.5 hours per week through automation and faster data access</li>
                  <li><strong>Decision Speed:</strong> Executives report making data-driven decisions 3x faster</li>
                  <li><strong>Learning Curve:</strong> New users become productive in 1 day vs. 2 weeks with old system</li>
                  <li><strong>Report Generation:</strong> Automated reports save 15 hours/week per department</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Qualitative Feedback</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm italic mb-3">
                      "This is exactly what we needed. I can ask questions in plain English and get answers immediately. The AI actually understands our business context."
                    </p>
                    <p className="text-xs text-gray-600">— VP of Product, 12 years at company</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm italic mb-3">
                      "The proactive insights are game-changing. Instead of me hunting for problems, the system tells me what I need to know. It's like having a data analyst on my team."
                    </p>
                    <p className="text-xs text-gray-600">— Operations Director</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm italic mb-3">
                      "I was skeptical about AI, but this feels natural. It's not trying to replace my judgment—it's augmenting it. The conversational interface makes complex data accessible."
                    </p>
                    <p className="text-xs text-gray-600">— Marketing Manager, non-technical background</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Lessons: AI's Role in Enhancing UX</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Transparency Builds Trust</h4>
                    <p className="text-sm text-gray-600">
                      Users need to understand how AI makes decisions. We always showed source data and confidence levels, which increased trust by 40% in user surveys.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Augmentation, Not Replacement</h4>
                    <p className="text-sm text-gray-600">
                      The most successful AI features enhanced human decision-making rather than replacing it. Users appreciated AI suggestions but always wanted final control.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Context is Everything</h4>
                    <p className="text-sm text-gray-600">
                      Conversational AI works best when it understands user context—role, previous queries, current task. This required careful design of context management systems.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">4. Progressive Disclosure</h4>
                    <p className="text-sm text-gray-600">
                      We learned to start simple and reveal complexity gradually. New users begin with basic queries, then discover advanced features as they become comfortable.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Business Impact</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>ROI:</strong> $2.3M annual value through productivity gains and reduced support costs</li>
                  <li><strong>User Satisfaction:</strong> Increased from 3.1/5 to 4.7/5 in quarterly surveys</li>
                  <li><strong>Feature Adoption:</strong> 80% of users actively use AI-powered features weekly</li>
                  <li><strong>Competitive Advantage:</strong> Company now uses this as a recruiting tool, showcasing innovation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Visuals & Links */}
          <section>
            <h2 className="text-3xl font-light mb-8">Visuals & Links</h2>
            
            <div className="space-y-8 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="text-xl font-light mb-4">Key Screenshots & Mockups</h3>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-sm text-gray-500 italic">
                      [Main Dashboard View - Showing conversational interface with AI insights panel]
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Interactive prototype available upon request
                    </p>
                  </div>
                  <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-sm text-gray-500 italic">
                      [Conversational Query Interface - Natural language input with contextual responses]
                    </p>
                  </div>
                  <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <p className="text-sm text-gray-500 italic">
                      [AI-Powered Insights Panel - Proactive recommendations and automated reports]
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Process Documentation</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>User Journey Maps - Before/After workflows</li>
                  <li>Information Architecture - Data hierarchy and navigation structure</li>
                  <li>Conversational Flow Diagrams - AI interaction patterns</li>
                  <li>User Testing Results - 12 rounds of testing documentation</li>
                  <li>Design System - Component library and AI interaction guidelines</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Related Articles & Case Studies</h3>
                <div className="space-y-2">
                  <a
                    href="https://substack.com/@saianjan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    → "The Future of Conversational Enterprise Software" (Substack)
                  </a>
                  <a
                    href="https://medium.com/@saianjan.margani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    → "Designing AI-Powered Dashboards: Lessons from Microsoft Copilot" (Medium)
                  </a>
                  <a
                    href="https://substack.com/@saianjan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    → "AI Ethics in Enterprise UX: Balancing Automation with Human Control" (Substack)
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-4">Interactive Prototypes</h3>
                <p className="text-sm text-gray-600 mb-4">
                  High-fidelity interactive prototypes demonstrating conversational interface, AI-powered insights, and automated workflows are available for review.
                </p>
                <p className="text-sm text-gray-500">
                  Contact me at <a href="mailto:saianjan.margani@gmail.com" className="text-black hover:underline">saianjan.margani@gmail.com</a> for access to prototypes and detailed design documentation.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="pt-8 border-t border-gray-200">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-light mb-4">Reflection</h3>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                This project demonstrated the transformative power of conversational design in enterprise software. By applying principles similar to Microsoft Copilot—natural language interaction, intelligent automation, and proactive insights—we created a dashboard that feels less like software and more like a knowledgeable assistant.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                The success of this project validates that conversational AI isn't just a trend—it's the future of how we'll interact with complex enterprise systems. The key is designing AI that augments human intelligence rather than replacing it, always maintaining transparency and user control.
              </p>
            </div>
          </section>
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

