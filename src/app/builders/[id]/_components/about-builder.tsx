import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBuilder() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About the Builder</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
                <p>Prestige Group is one of India's leading real estate developers with over three decades of excellence in creating iconic residential and commercial spaces. Founded in 1986, the company has consistently delivered world-class projects that redefine urban living.</p>
                <p>With a strong presence across South India, Prestige Group has developed over 280 projects covering more than 150 million square feet. The company's commitment to quality, innovation, and customer satisfaction has made it a trusted name in the real estate industry.</p>
                <p>From luxury apartments and villas to commercial complexes and retail spaces, Prestige Group continues to shape skylines and create communities that enhance the quality of life for thousands of families.</p>
            </CardContent>
        </Card>
    );
}
