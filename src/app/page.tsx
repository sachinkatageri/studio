import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';
import PropertyList from '@/components/sections/property-list';
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar side="left" className="hidden md:flex flex-col border-r w-96">
             <SidebarContent>
                <PropertyList />
             </SidebarContent>
          </Sidebar>
          <main className="flex-1 relative">
            <MapView />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
