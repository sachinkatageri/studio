import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Hand, Tag } from 'lucide-react';

const services = [
  {
    icon: <Hand className="h-10 w-10 text-primary" />,
    title: 'Hand Holding',
    description: 'Our experts will guide you through every step of the property buying process, from search to possession.',
  },
  {
    icon: <Tag className="h-10 w-10 text-primary" />,
    title: 'Tag Along',
    description: 'Invest in large land parcels with us. A unique co-investment opportunity for savvy investors.',
  },
];

export default function OurServices() {
  return (
    <section id="our-services" className="py-16 sm:py-24 bg-muted/50 rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We offer specialized services to make your real estate journey seamless.
          </p>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  {service.icon}
                </div>
                <CardTitle className="mt-4">{service.title}</CardTitle>
                <CardDescription className="mt-2">{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
