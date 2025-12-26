
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-headline">{title}</h2>
        <div className="space-y-4 text-muted-foreground text-base md:text-lg">{children}</div>
    </div>
);

const FounderCard = ({ name, title, description, imageUrl, imageHint }: { name: string; title: string; description: string; imageUrl: string, imageHint: string }) => (
    <Card>
        <CardContent className="p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src={imageUrl} alt={name} fill className="object-cover" data-ai-hint={imageHint} />
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-primary font-semibold">{title}</p>
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
        </CardContent>
    </Card>
);

export default function AboutPage() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 font-headline">About Us</h1>

                    <Section title="Our Hypothesis">
                        <p>Land, is the most opaque market. If we can solve the information problem for this market, we'll be of immense value to tens of millions of people (buyers, owners, agent, builders).</p>
                    </Section>

                    <Section title="The Truth">
                        <p>All the information, that is required to solve the Land Market completely, is already there with 'someone' at this current moment.</p>
                        <p className="italic">(Consider all these pieces of information, like the pieces of large jigsaw puzzle).</p>
                        <p>Since, all the pieces already exist, there is scope for such an algorithm, that can put together 'all these pieces' and solve the information problem, almost instantly.</p>
                    </Section>

                    <Section title="Our Mission">
                        <p>At 1acre.in, we exist to design such an algorithm, that can solve the Land Market, completely and instantly.</p>
                        <p>The key to such an algorithm is simple - Incentivise the good players heavily & instantly. Align the incentives of all the good players (Buyers, Agents, Owners & Builders).</p>
                    </Section>

                    <Section title="Our First Steps">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle>Verification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our first step, was Verification. We do a 'Preliminary Verification' before we list any Land or Plot on 1acre. There is a distinct & pre-defined process for every state and UT. This process eliminates 90% of the potential issues.</p>
                            </CardContent>
                        </Card>
                         <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle>Instant Discovery</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our next step is - Making discovery of these Verified Lands, instant! With the Latest MapView, that is Free for all, anyone looking to Buy Land anywhere in India, should find the best Land instantly and anybody, that is looking to Sell Land anywhere in India whether it is an owner or an agent, should find the best possible Buyer, almost instantly.</p>
                            </CardContent>
                        </Card>
                    </Section>
                    
                    <Section title="Our Goal for 2025">
                         <p>To bring instant discoverability, to all Verified Lands for sale, for all of India, through the MapView, that is Free for all.</p>
                    </Section>

                    <Section title="What's Next?">
                        <p>Does that solve the Land Market completely? No. As we mentioned, Land is the most opaque market and verifying and solving for instant discovery are only the beginning of it.</p>
                        <p>We want to help people transact Land, at scale, by getting involved in the transactions. We want to solve 'for all property' like how we are solving 'for all Land'.</p>
                        <p>We want to take this global, because why not help many more people, billions of them? The nature of the problem does not change. Only the players.</p>
                        <p className="font-semibold text-foreground text-xl pt-4">Every problem, is an information problem.</p>
                    </Section>

                    <div className="text-center my-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet the Founders!</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FounderCard
                            name="Satish Chandra"
                            title="Co-Founder"
                            description="Director, Mordor Intelligence, IIM Ahmedabad, BITS Pilani"
                            imageUrl="https://picsum.photos/seed/satish/400/400"
                            imageHint="male founder"
                        />
                        <FounderCard
                            name="Ratna Kiran"
                            title="Co-Founder"
                            description="Architect, School of planning & architecture, New Delhi."
                            imageUrl="https://picsum.photos/seed/ratna/400/400"
                            imageHint="female founder"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
