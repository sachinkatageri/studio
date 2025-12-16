import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const AppStoreButton = () => (
    <Link href="#" className="inline-block">
        <Image src="https://www.buildersinfo.in/assets/app-store.png" alt="Download on the App Store" width={144} height={48} />
    </Link>
)
const PlayStoreButton = () => (
    <Link href="#" className="inline-block">
        <Image src="https://www.buildersinfo.in/assets/play-store.png" alt="Get it on Google Play" width={144} height={48} />
    </Link>
)

export default function BrokerageBanner() {
    return (
        <section className="bg-blue-50 mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 items-center gap-8">
                    <div className="py-12">
                        <h2 className="text-3xl font-bold mb-4">Brokerage - Free Real Estate at Your Fingertips</h2>
                        <p className="text-muted-foreground mb-6">
                            Buildersinfo is India's first brokerage-free real estate discovery platform. Find properties, projects and builders in your city.
                        </p>
                        <div className="flex items-center gap-4">
                            <AppStoreButton />
                            <PlayStoreButton />
                        </div>
                    </div>
                    <div className="relative h-full min-h-[300px] hidden md:block">
                        <Image 
                            src="https://www.buildersinfo.in/assets/app-screen.png"
                            alt="BuildersInfo App"
                            fill
                            className="object-contain object-bottom"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
