import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ContactLink } from "@/components/contact-link";
import { ExperienceItem } from "@/components/experience-item";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-2xl mx-auto px-4 py-0 md:px-0 md:py-0">
        {/* Header with Avatar */}
        <div className="flex flex-col md:flex-row mt-12 md:mt-24 mb-8 md:mb-4">
          <div className="order-1 md:order-1 mb-4 md:mb-0 w-full md:w-1/4">
            <Image
              src="/Images/me.jpg"
              alt="Sai Anjan"
              width={96}
              height={96}
              className="rounded-full"
            />
          </div>
          <div className="w-full md:w-3/5 pr-0 md:pr-3 order-2 md:order-2 my-2 md:my-2">
            <h3 className="m-0 font-light text-xl md:text-2xl text-black text-left">
              Sai Anjan
            </h3>
            <p className="my-0 text-sm font-light leading-relaxed text-left text-gray-600">
              UX Designer in DuPont India
            </p>
            <Link
              href="/resume.pdf"
              className="text-xs link hover:opacity-70 rounded-full px-3 py-2 my-3 inline-block text-black bg-gray-100"
            >
              📄 Resume
            </Link>
          </div>
        </div>

        {/* About */}
        <h2 className="py-0 font-light text-sm pr-3 px-0 md:px-0">About</h2>
        <p className="text-sm font-light text-gray-600 mt-2 mb-1 leading-relaxed">
          I'm a Product Designer with over 5 years of experience in UX research
          and interaction design. I've worked with companies like Microsoft,
          Dell, and Jio Platforms, focusing on creating user-centered designs
          and solving complex problems through innovation.
        </p>

        {/* Teams */}
        <h2 className="pt-8 pb-0 font-light text-sm pr-3 px-0 md:px-0">Teams</h2>
        <article className="py-3 px-3 md:px-0">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 pr-0 md:pr-3 order-2 md:order-1">
              <p className="text-sm font-light text-gray-500 mt-0">Current</p>
            </div>
            <div className="w-3/10 md:w-1/5 pr-0 md:pr-3 order-2 md:order-1">
              <a
                href="https://www.dupont.com/water"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://watertools-qa.dupont.com//public/images/logo-DuPont.png"
                  alt="DuPont"
                  width={120}
                  height={60}
                  className="block rounded-lg"
                />
              </a>
            </div>
          </div>
        </article>

        {/* Projects */}
        <h2 className="pt-8 pb-0 font-light text-sm pr-3 px-0 md:px-0">
          Projects
        </h2>
        <ProjectCard
          year="2024"
          title="Gpay + Wallet"
          readTime="7 min read"
          image="/Images/gpay.png"
          href="/projects/gpay"
        />
        <ProjectCard
          year="2022"
          title="Mindhouse live class filtering"
          readTime="7 min read"
          image="/Images/mindhouse.png"
          href="/projects/mindhouse"
        />
        <ProjectCard
          year="2020"
          title="Teaching Strategies"
          readTime="7 min read"
          image="/Images/p2.png"
          href="/projects/teaching-strategies"
        />
        <ProjectCard
          year="2020"
          title="Note － M"
          readTime="7 min read"
          image="/Images/notem.png"
          href="/projects/note-m"
        />
        <ProjectCard
          year="2020"
          title="Tulasi"
          readTime="7 min read"
          image="/Images/tulasi.png"
          href="/projects/tulasi"
        />
        <ProjectCard
          year="2019"
          title="Summer Internship"
          readTime="6 min read"
          image="/Images/ms.png"
          href="/projects/summer-internship"
        />
        <ProjectCard
          year="2019"
          title="Pepper"
          readTime="5 min read"
          image="/Images/pepper.png"
          href="/projects/pepper"
        />
        <ProjectCard
          year="2018"
          title="Co － Cards"
          readTime="7 min read"
          image="/Images/cocards.png"
          href="https://www.behance.net/gallery/82968779/Co-Cards-Interactive-learning-tool-for-high-school-kids"
          external
        />
        <ProjectCard
          year="2018"
          title="e － Vaahan"
          readTime="7 min read"
          image="/Images/evaahan.png"
          href="/projects/evaahan"
        />
        <ProjectCard
          year="2018"
          title="Anjani Font"
          readTime="7 min read"
          image="/Images/anjani.png"
          href="/projects/anjani-font"
        />
        <ProjectCard
          year="2017"
          title="AP Jhanmabhoomi magazine design"
          readTime="7 min read"
          image="/Images/magazine.png"
          href="https://www.behance.net/gallery/89177421/1000-days-of-Transforming-The-Motherland"
          external
        />

        {/* Interaction Techniques */}
        <h2 className="pt-8 pb-0 font-light text-sm pr-3 px-0 md:px-0">
          Interaction Techniques
        </h2>
        <a
          href="https://v0.dev/chat/dual-thumb-range-slider-fkMr4tGGxdp"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:opacity-70 transition-opacity"
        >
          <article className="py-3 px-3 md:px-0">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 pr-0 md:pr-3 order-2 md:order-1">
                <p className="text-sm font-light text-gray-500 mt-2 mb-1 md:mt-0">
                  2024
                </p>
              </div>
              <div className="w-full md:w-3/5 pr-0 md:pr-3 order-2 md:order-1">
                <p className="pl-0 text-sm font-light leading-relaxed mb-2 mt-0">
                  Dual Thumb Range Slider
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block ml-1"
                  >
                    <path
                      d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
                      fill="#111"
                    />
                  </svg>
                </p>
                <p className="text-sm font-light text-gray-500 mt-0">
                  Interactive demo
                </p>
              </div>
              <div className="pl-0 md:pl-3 order-1 md:order-2 mb-4 md:mb-0 w-full md:w-3/10">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/Images/interactions/range-slider.png"
                    alt="Dual Thumb Range Slider showing a price range selector from $0 to $150,000"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </article>
        </a>

        {/* Work Experience */}
        <h2 className="pt-8 pb-0 font-light text-sm pr-3 px-0 md:px-0">
          Work Experience
        </h2>
        <ExperienceItem
          period="Feb'22 － Jul'24"
          title="Design Manager at Jio Platforms Limited"
          location="Hyderabad, IN"
        />
        <ExperienceItem
          period="Dec'20 － Jan'22"
          title="Interaction Designer(Consultant), Dell"
          location="Remote"
        />
        <ExperienceItem
          period="Jul'20 － Oct'20"
          title="Product Designer at Mindhouse"
          location="Remote"
        />
        <ExperienceItem
          period="May'19 － Jul'19"
          title="UX Design Intern at Microsoft"
          location="Hyderabad, IN"
        />
        <ExperienceItem
          period="Jan'17 － Aug'18"
          title="UI/UX Designer at TCS"
          location="Chennai, IN"
        />

        {/* Education */}
        <h2 className="pt-8 pb-0 font-light text-sm pr-3 px-0 md:px-0">
          Education
        </h2>
        <ExperienceItem
          period="2018 － 2020"
          title="M.Des, Interaction design at IDC School of Design"
          location="IIT Bombay, IN"
        />
        <ExperienceItem
          period="2012 － 2016"
          title="BE, Electrical engineering at Andhra University"
          location="Andhra Pradesh, IN"
        />

        {/* Contact */}
        <h2 className="pt-8 pb-0 font-light text-sm pr-3 px-0 md:px-0">Contact</h2>
        <ContactLink
          label="Substack"
          value="@saianjan"
          href="https://substack.com/@saianjan"
          external
        />
        <ContactLink
          label="Twitter"
          value="@Dhaathre"
          href="https://x.com/Dhaathre"
          external
        />
        <ContactLink
          label="Medium"
          value="@saianjan.margani"
          href="https://medium.com/@saianjan.margani"
          external
        />
        <ContactLink
          label="Linkedin"
          value="@saianjan"
          href="https://www.linkedin.com/in/saianjan/"
          external
        />
        <ContactLink
          label="Email"
          value="saianjan.margani@gmail.com"
          href="mailto:saianjan.margani@gmail.com"
          external
        />
      </section>

      {/* Footer */}
      <footer className="py-8 px-3 md:px-12 text-center">
        <h2 className="pt-8 pb-3 font-light text-sm px-3 px-0 md:px-0">
          Made with ❤️ in Hyderabad, India.
        </h2>
        <div className="flex justify-center gap-3">
          <a
            href="https://x.com/Dhaathre"
            className="link hover:opacity-70 text-gray-600 inline-block h-8 w-8 rounded-full p-2 bg-gray-100 border border-gray-200"
            title="Twitter"
          >
            <svg
              data-icon="twitter"
              viewBox="0 0 32 32"
              className="w-full h-full"
              style={{ fill: "currentColor" }}
            >
              <title>twitter icon</title>
              <path d="M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4"></path>
            </svg>
          </a>
          <a
            href="https://dribbble.com/saianjan"
            className="link hover:opacity-70 text-gray-600 inline-block h-8 w-8 rounded-full p-2 bg-gray-100 border border-gray-200"
            title="Dribbble"
          >
            <svg
              data-icon="dribbble"
              viewBox="0 0 32 32"
              className="w-full h-full"
              style={{ fill: "currentColor" }}
            >
              <title>dribbble icon</title>
              <path d="M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M5 11.5 A12 12 0 0 1 11 5 A46 46 0 0 1 13.5 9.25 A46 46 0 0 1 5 11.5 M15 4 A12 12 0 0 1 21.5 5.25 A46 46 0 0 1 17 7.75 A50 50 0 0 0 15 4 M4 16 A50 50 0 0 0 15 13 A46 46 0 0 1 16 15.5 A26 26 0 0 0 6 22.5 A12 12 0 0 1 4 16 M18.5 11.5 A50 50 0 0 0 25 8 A12 12 0 0 1 28 13.75 A26 26 0 0 0 19.75 14.5 A50 50 0 0 0 18.5 11.5 M17 19.5 A46 46 0 0 1 18 28 A12 12 0 0 1 8.75 25.5 A22 22 0 0 1 17 19.5 M20.75 18.25 A22 22 0 0 1 28 17.75 A12 12 0 0 1 22 26.5 A50 50 0 0 0 20.75 18.25"></path>
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
