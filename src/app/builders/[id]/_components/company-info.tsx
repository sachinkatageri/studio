
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, HardHat, ShieldCheck, Star } from "lucide-react";

export default function CompanyInfo() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm md:text-base">
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <p className="text-xs md:text-sm text-muted-foreground">License Number</p>
                            <p className="font-semibold text-sm md:text-base">RERA-KAR-2021-0012345</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <p className="text-xs md:text-sm text-muted-foreground">Certificate</p>
                            <p className="font-semibold text-sm md:text-base">ISO 9001:2015 Certified</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <p className="text-xs md:text-sm text-muted-foreground">Category</p>
                            <p className="font-semibold text-sm md:text-base">Premium Developer</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <p className="text-xs md:text-sm text-muted-foreground">Founded</p>
                            <p className="font-semibold text-sm md:text-base">1986</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-3 text-sm md:text-base">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Residential</Badge>
                        <Badge variant="secondary">Commercial</Badge>
                        <Badge variant="secondary">Hospitality</Badge>
                        <Badge variant="secondary">Retail</Badge>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-3 text-sm md:text-base">Operating Regions</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Bangalore', 'Chennai', 'Hyderabad', 'Kochi', 'Mangalore', 'Mumbai', 'Mysore', 'Goa', 'Pune', 'Coimbatore', 'Dubai'].map(city => (
                            <Badge key={city} variant="outline">{city}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
