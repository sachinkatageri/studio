
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Car } from "lucide-react";
import Image from "next/image";

export default function CheckTravelTimeCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Check Travel Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                        <Input placeholder="Choose Starting Point (like office or kid's school)" className="border-none focus-visible:ring-0 p-0"/>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                        <Car className="h-6 w-6 text-primary" />
                         <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                        <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded-lg">
                         <div className="relative w-12 h-12 rounded-md overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y293b3JraW5nJTIwc3BhY2V8ZW58MHx8fHwxNzY1NzM3NDU2fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="WeWork" fill className="object-cover" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">WeWork Vaishnavi Signature</p>
                            <p className="text-xs text-muted-foreground">Bellandur, Bangalore, Karnataka</p>
                        </div>
                    </div>
                </div>
                <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Show Travel Time
                </Button>
            </CardContent>
        </Card>
    );
}
