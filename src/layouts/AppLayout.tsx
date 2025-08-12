import { Footer } from "@/components/Footer/Footer";
import { TopBar } from "@/components/TopBar/TopBar";

export function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <nav className="">
        <TopBar />
      </nav>
      <section className="max-w-screen-2xl mx-auto px-5 pb-10 mt-10">
        {children}
      </section>
      <Footer />
    </>
  );
}
