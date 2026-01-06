
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

const teamMembers = [
    {
        name: "Irfan Razack",
        role: "Chairman & Managing Director",
        quote: "Our success lies in our unwavering commitment to quality and our ability to anticipate and exceed customer expectations. We don’t just build structures, we create experiences.",
        img: "https://img.freepik.com/free-photo/portrait-successful-man-having-business-meeting-talking_1150-26998.jpg"
    },
     {
        name: "Jane Doe",
        role: "Chief Executive Officer",
        quote: "Innovation is at the heart of everything we do. We constantly strive to push the boundaries of design and construction to deliver exceptional value to our clients.",
        img: "https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg"
    }
];

export default function TeamSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Meet the Team</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {teamMembers.map((member, index) => (
                            <CarouselItem key={index}>
                                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0">
                                        <Image src={member.img} alt={member.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{member.name}</h3>
                                        <p className="text-primary font-semibold">{member.role}</p>
                                        <p className="text-muted-foreground mt-2 italic">"{member.quote}"</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
            </CardContent>
        </Card>
    );
}
