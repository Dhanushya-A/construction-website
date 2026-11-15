import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop, CookieBar } from "@/components/site/Extras";
import { PageTitle } from "@/components/shop/PageTitle";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — XTRA Construction" },
      { name: "description", content: "Shop construction packs and tool sets from XTRA Construction: helmets, toolboxes, measuring tapes, safety glasses and more." },
      { property: "og:title", content: "Shop — XTRA Construction" },
      { property: "og:description", content: "Browse XTRA Construction tool packs and safety gear by category: new arrivals, best sellers, featured and premium sets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="relative">
      <TopBar />
      <div className="relative">
        <Header />
        <main>
          <PageTitle title="Shop" crumb="Products" />
          <ShopCatalog />
        </main>
      </div>
      <Footer />
      <BackToTop />
      <CookieBar />
    </div>
  );
}
