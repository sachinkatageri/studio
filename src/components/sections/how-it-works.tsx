import { CheckCircle, ShieldCheck, Users } from 'lucide-react';

const benefits = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Verified Listings',
    description: 'Every property and builder on our platform is thoroughly verified for authenticity and quality.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Transparent Process',
    description: 'We believe in complete transparency, providing you with all the details you need to make informed decisions.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Expert Support',
    description: 'Our team of real estate experts is always ready to assist you at every step of your journey.',
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose BuildersInfo?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your trusted partner in navigating the real estate market.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-4">
              <div className="flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-1 text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
