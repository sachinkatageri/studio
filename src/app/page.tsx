import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';

export default function Home() {
  return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <main className="flex-1 relative">
          <MapView />
        </main>
      </div>
  );
}
