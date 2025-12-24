"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

export default function GetInTouchForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Our team will respond within 1 hr</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Loan Quotes within 1 day</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <Input placeholder="Name" />
                    <Input type="email" placeholder="Email ID" />
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            +91
                        </span>
                        <Input type="tel" placeholder="Phone Number" className="rounded-l-none" />
                    </div>
                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">Contact Now</Button>
                </form>
            </CardContent>
        </Card>
    );
}
