
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, SlidersHorizontal, FileText, Star, MessageSquare } from "lucide-react";

const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="mb-12">
        <div className="flex items-center mb-4">
            {icon}
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-headline ml-3">{title}</h2>
        </div>
        <div className="space-y-4 text-muted-foreground text-base md:text-lg">{children}</div>
    </div>
);

export default function KnowledgeBasePage() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 font-headline">Knowledge Base</h1>

                    <Section title="Map View" icon={<Map className="h-8 w-8 text-primary" />}>
                        <p>The interactive map is the core of your property search. You can pan, zoom, and click on property markers to get a quick overview.</p>
                        <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-xl">Markers</CardTitle></CardHeader>
                            <CardContent>
                                <p>Each marker on the map represents a property. The price is displayed directly on the marker. Clicking it will open a summary card at the bottom of the screen with more details.</p>
                            </CardContent>
                        </Card>
                         <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-xl">Map Controls</CardTitle></CardHeader>
                            <CardContent>
                                <p>Use the controls on the right side of the map to access map layers, recenter on your location, and list new properties. The panel on the left can be expanded or collapsed to show a list of properties.</p>
                            </CardContent>
                        </Card>
                    </Section>

                    <Section title="Filters & Sorting" icon={<SlidersHorizontal className="h-8 w-8 text-primary" />}>
                        <p>Refine your search to find exactly what you're looking for using our powerful filtering and sorting tools.</p>
                        <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-xl">Applying Filters</CardTitle></CardHeader>
                            <CardContent>
                                <p>Click the filter icon in the search bar to open the filter menu. You can filter by search type (locality or metro), property type, price range, furnishing, and more. Once you've made your selections, click "Apply Filters" to update the map and list.</p>
                            </CardContent>
                        </Card>
                    </Section>

                    <Section title="Property Details" icon={<FileText className="h-8 w-8 text-primary" />}>
                        <p>Dive deep into a property's specifics on its dedicated detail page. This page is organized into several sections for easy navigation.</p>
                         <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-xl">Key Sections</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Overview:</strong> A summary of the property.</li>
                                    <li><strong>Amenities:</strong> A list of all available amenities.</li>
                                    <li><strong>Layout & Location:</strong> Visual information about the property's structure and its place on the map.</li>
                                    <li><strong>Ratings & Reviews:</strong> See what others are saying.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Section>
                    
                    <Section title="Ratings & Reviews" icon={<Star className="h-8 w-8 text-primary" />}>
                        <p>Your feedback is valuable to the community. You can rate properties and leave detailed reviews about your experience.</p>
                        <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-xl">How to Leave a Review</CardTitle></CardHeader>
                            <CardContent>
                                <p>On any property details page, navigate to the "Ratings & Reviews" section and click the "Rate property" button. You can give a star rating and write about the good and bad aspects of the property.</p>
                            </CardContent>
                        </Card>
                    </Section>

                    <Section title="Contacting Sellers" icon={<MessageSquare className="h-8 w-8 text-primary" />}>
                        <p>Interested in a property? You can easily get in touch with the builder or seller directly from the property page.</p>
                        <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-xl">Contact Form</CardTitle></CardHeader>
                            <CardContent>
                                <p>Use the "Interested in this property?" form on the right side of the desktop view, or use the contact buttons on mobile. Fill in your details, and an enquiry will be sent directly to the seller.</p>
                            </CardContent>
                        </Card>
                    </Section>

                </div>
            </div>
            <Footer />
        </>
    );
}
