
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Building2, Users, Briefcase, Armchair, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const brandStats = [
    { value: "2+", label: "Cities", icon: Building2 },
    { value: "1000+", label: "Clients", icon: Users },
    { value: "27+", label: "Coworking Spaces", icon: Briefcase },
    { value: "8000+", label: "Seats", icon: Armchair }
];

export default function AboutBrandCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">About the brand</CardTitle>
                <div className="w-10 h-1 bg-primary"></div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                    <Image src="https://cdn-icons-png.flaticon.com/512/90/90830.png" alt="BHIVE Logo" width={40} height={40} />
                    <div>
                        <h3 className="text-xl font-bold">BHIVE</h3>
                        <p className="text-sm font-semibold text-muted-foreground">WORKSPACE</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    {brandStats.map(stat => (
                        <div key={stat.label} className="flex items-center gap-2">
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="font-bold">{stat.value}</p>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    BHIVE Workspace, established in 2014, specializes in providing Zero CapEx, Enterprise Grade, Customized managed office spaces. With 26+ locations in Bangalore and an expansion to Mumbai, BHIVE's flagship HSR campus is the largest in India, offering over 8,000 seats...
                    <Button variant="link" className="p-0 h-auto text-primary text-sm">Read less</Button>
                </p>
                <Button variant="outline" className="w-full">
                    Interested in BHIVE Workspace? Connect with us <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </CardContent>
        </Card>
    );
}
