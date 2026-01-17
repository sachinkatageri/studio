
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { VerificationProcessDialog } from '@/components/layout/verification-process-dialog';
import { Card, CardContent } from '@/components/ui/card';

export default function VerificationCard() {
    const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);

    return (
        <>
            <Card className="mt-8 bg-muted/50 border">
                <CardContent className="p-4">
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-semibold text-foreground">Preliminary verification done.</span>
                            <Button variant="link" className="p-0 h-auto text-primary ml-auto" onClick={() => setIsVerificationDialogOpen(true)}>Know Process</Button>
                        </div>
                        <div className="flex items-start gap-2 text-orange-600 dark:text-orange-400">
                            <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-muted-foreground">The land location with survey number could not be verified due to unavailability of cadastral maps.</p>
                                <Button variant="link" className="text-orange-600 dark:text-orange-400 p-0 h-auto">Report this listing</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <VerificationProcessDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen} />
        </>
    )
}
