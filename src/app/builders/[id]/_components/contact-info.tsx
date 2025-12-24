import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
];

export default function ContactInfo() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <a href="tel:+918328868333" className="flex items-center gap-3 text-muted-foreground hover:text-primary">
                    <Phone className="h-5 w-5" />
                    <span>+91 83 2886 8333</span>
                </a>
                <a href="mailto:info@prestigeconstructions.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary">
                    <Mail className="h-5 w-5" />
                    <span>info@prestigeconstructions.com</span>
                </a>
                <div className="flex items-center gap-2 pt-2">
                    {socialLinks.map((link, i) => (
                        <Button key={i} variant="outline" size="icon" asChild>
                            <Link href={link.href}>{link.icon}</Link>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
