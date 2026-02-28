import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import SidebarSteps from "@/components/SidebarSteps";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <Stepper />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-8 py-20 md:flex-row">
        <SidebarSteps />
        <section className="min-w-0 flex-1">
          <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
            {children}
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} AI App Builder
      </footer>
    </div>
  );
}
