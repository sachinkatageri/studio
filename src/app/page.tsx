import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <main className="flex-1 relative">
          <MapView />
        </main>
      </div>
    </SidebarProvider>
  );
}
