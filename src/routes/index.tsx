import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Projects } from "@/components/site/Projects";
import { Quote } from "@/components/site/Quote";
import { Testimonials } from "@/components/site/Testimonials";
import { Clients, Footer } from "@/components/site/Footer";
import { BackToTop, CookieBar } from "@/components/site/Extras";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XTRA Construction — Start New Projects" },
      {
        name: "description",
        content:
          "XTRA Construction: building engineering, road construction and maintenance. Committed to superior quality and results — request a free quote.",
      },
      { property: "og:title", content: "XTRA Construction — Start New Projects" },
      {
        property: "og:description",
        content: "Don’t get framed by the competition, trust our solid reputation. Building, road construction and maintenance services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <TopBar />
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Features />
          <About />
          <Services />
          <Process />
          <Projects />
          <Quote />
          <Testimonials />
          <Clients />
        </main>
      </div>
      <Footer />
      <BackToTop />
      <CookieBar />
    </div>
  );
}
