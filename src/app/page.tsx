import Header from '@/components/layout/header';
import MapView from '@/components/sections/map-view';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow">
        <MapView />
      </main>
    </div>
  );
}
