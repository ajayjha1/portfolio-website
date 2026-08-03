import { WorkshopStage } from "@/components/workshop/WorkshopStage";
import { MobileStage } from "@/components/workshop/MobileStage";

function Footer() {
  return (
    <p className="py-6 text-center font-marker text-sm text-wood-300/70">
      Still crafting. Still learning. Always shipping. 🚀
    </p>
  );
}

export default function Home() {
  return (
    <main className="relative z-[2] min-h-screen">
      {/* ── Desktop: full-bleed pixel-exact workshop stage (dock overlays the drawn left strip) ── */}
      <div className="hidden lg:block">
        <WorkshopStage />
        <Footer />
      </div>

      {/* ── Mobile / tablet: portrait workshop stage ── */}
      <div className="pb-24 lg:hidden">
        <MobileStage />
        <Footer />
      </div>
    </main>
  );
}
