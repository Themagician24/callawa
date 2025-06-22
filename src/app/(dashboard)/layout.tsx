import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

/**
 * Layout de niveau professionnel avec design moderne,
 * navigation sticky, sidebar élégante et contenu paddé.
 */
const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
        
        {/* Sidebar - visible dès md+ */}
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-border bg-background shadow-sm z-30">
          <DashboardSidebar />
        </aside>

        {/* Contenu principal */}
        <div className="flex flex-col flex-1 relative">

          {/* Navbar sticky avec effet glass */}
          <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
            <DashboardNavbar />
          </header>

          {/* Contenu avec scroll fluide et padding réactif */}
          <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-12">
            <div className="max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
