import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, Home, Search, Briefcase } from 'lucide-react';

const services = [
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: 'Property Search',
    description: 'Find the perfect property with our advanced search filters and comprehensive listings.',
  },
  {
    icon: <Building className="h-10 w-10 text-primary" />,
    title: 'Builder Profiles',
    description: 'Explore detailed profiles of top builders, their projects, and their track records.',
  },
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: 'Project Insights',
    description: 'Get in-depth information on ongoing and completed real estate projects.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Commercial Properties',
    description: 'Discover a wide range of commercial properties for your business needs.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We provide a comprehensive suite of services to cater to all your real estate needs.
          </p>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
