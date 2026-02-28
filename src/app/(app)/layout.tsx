import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import SidebarSteps from "@/components/SidebarSteps";
import { Container } from "@/components/ui";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header />
      <Stepper />
      <main className="flex-1 pb-[60px] pt-[100px]">
        <Container className="flex flex-col gap-8 md:flex-row">
          <SidebarSteps />
          <section className="min-w-0 flex-1">
            <div className="rounded-card border border-border bg-surface p-7">
              {children}
            </div>
          </section>
        </Container>
      </main>
      <footer className="py-8 text-center text-sm text-text2">
        © {new Date().getFullYear()} AI App Builder
      </footer>
    </div>
  );
}
