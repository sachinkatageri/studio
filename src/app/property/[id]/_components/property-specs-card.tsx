
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Building, Armchair, Building2, Users, User } from "lucide-react";

const specs = [
    { label: "Property Type", value: "Tech Park", icon: <Building2 className="w-5 h-5 text-primary" /> },
    { label: "Furnishing level", value: "Ready to move-in", icon: <Armchair className="w-5 h-5 text-primary" /> },
    { label: "Building Lease", value: "Full Building / Partial Floors", icon: <Building className="w-5 h-5 text-primary" /> },
    { label: "Min. inventory unit", value: "30 seats (1,500 sq. ft)", icon: <Users className="w-5 h-5 text-primary" /> },
    { label: "Max. inventory unit", value: "300 seats (1,5000 sq. ft)", icon: <Users className="w-5 h-5 text-primary" /> },
    { label: "Single floor Capacity", value: "200 seats (1,0000 sq. ft)", icon: <User className="w-5 h-5 text-primary" /> },
]

export default function PropertySpecsCard({ property }: { property: any }) {
    return (
        <Card id="specs">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <h2 className="text-xl font-bold">{property.name}</h2>
                        <div className="flex items-end gap-2 mt-2">
                             <p className="text-2xl font-bold text-primary">₹9,000 <span className="text-sm font-normal text-muted-foreground">/ seat / month</span></p>
                             <p className="text-sm text-muted-foreground">(negotiable)</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 border-green-200 text-green-700 text-sm py-2 px-4">
                        <span className="font-bold text-lg mr-2">%</span> Best price guaranteed - save up to 15% with Buildersinfo
                        <Info className="h-4 w-4 ml-2" />
                    </Badge>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {specs.map(spec => (
                        <div key={spec.label} className="flex items-center gap-4">
                            <div className="bg-muted p-3 rounded-lg">
                                {spec.icon}
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground flex items-center">{spec.label} <Info className="h-3 w-3 ml-1 cursor-pointer" /></p>
                                <p className="font-bold">{spec.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
