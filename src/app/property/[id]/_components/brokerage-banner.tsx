
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const AppStoreButton = () => (
    <Link href="#" className="inline-block">
        <Image src="https://c.housingcdn.com/demand/s/client/common/assets/app-store.10009972.png" alt="Download on the App Store" width={144} height={48} />
    </Link>
)
const PlayStoreButton = () => (
    <Link href="#" className="inline-block">
        <Image src="https://c.housingcdn.com/demand/s/client/common/assets/google-play.2c209e8c.png" alt="Get it on Google Play" width={144} height={48} />
    </Link>
)

export default function BrokerageBanner() {
    return (
        <section className="bg-muted md:mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 items-center gap-8">
                    <div className="py-12 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Brokerage - Free Real Estate at Your Fingertips</h2>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto md:mx-0 text-sm md:text-base">
                            Buildersinfo is India's first brokerage-free real estate discovery platform. Find properties, projects and builders in your city.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <AppStoreButton />
                            <PlayStoreButton />
                        </div>
                    </div>
                    <div className="relative h-full min-h-[300px] hidden md:flex items-center justify-center">
                        <Image 
                            src="https://i.ibb.co/v6CN21Pt/image-Photoroom.png"
                            alt="BuildersInfo App"
                            width={300}
                            height={300}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
