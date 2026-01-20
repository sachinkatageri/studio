
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Factory, Store, Briefcase, Globe } from 'lucide-react';
import React from 'react';

const clientIcons = [
    { name: "Client 1", icon: <Building2 className="h-8 w-8 text-muted-foreground" /> },
    { name: "Client 2", icon: <Factory className="h-8 w-8 text-muted-foreground" /> },
    { name: "Client 3", icon: <Store className="h-8 w-8 text-muted-foreground" /> },
    { name: "Client 4", icon: <Briefcase className="h-8 w-8 text-muted-foreground" /> },
    { name: "Client 5", icon: <Globe className="h-8 w-8 text-muted-foreground" /> },
]

export default function AssistedClientsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">We have assisted</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                    Rohit's team assisted 500+ corporates in Bangalore to move into their new office.
                </p>
                <div className="flex justify-around items-center flex-wrap gap-4">
                    {clientIcons.map((client) => (
                        <div key={client.name} className="relative h-8 w-8">
                            {client.icon}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
