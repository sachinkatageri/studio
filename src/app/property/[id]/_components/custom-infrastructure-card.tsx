
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DoorClosed, ConciergeBell, Coffee, Gamepad2 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const infrastructure = [
    { label: "Meeting Rooms", icon: <Users className="h-8 w-8 text-primary" /> },
    { label: "Private cabins", icon: <DoorClosed className="h-8 w-8 text-primary" /> },
    { label: "Reception area", icon: <ConciergeBell className="h-8 w-8 text-primary" /> },
    { label: "Pantry", icon: <Coffee className="h-8 w-8 text-primary" /> },
    { label: "Recreational Area", icon: <Gamepad2 className="h-8 w-8 text-primary" /> },
];

export default function CustomInfrastructureCard() {
    return (
        <Card id="custom-infra">
            <CardHeader>
                <CardTitle className="text-xl">
                    Custom infrastructure possible in your Managed Office ✨
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    {infrastructure.map(item => (
                        <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted">
                            {item.icon}
                            <p className="font-semibold text-sm">{item.label}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
