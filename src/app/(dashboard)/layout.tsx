import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-muted text-foreground">
        
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-shrink-0 border-r border-border bg-background">
          <DashboardSidebar />
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          
          {/* Navbar */}
          <header className="flex-shrink-0 border-b border-border bg-background z-10">
            <DashboardNavbar />
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
