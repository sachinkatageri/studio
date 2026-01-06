import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone } from "lucide-react"

const companyLinks = {
    "About Us": "/about",
    "Contact Us": "#",
    "Our Verification Process": "#",
    "Terms & Conditions": "/terms-and-conditions",
    "Privacy Policy": "/privacy-policy",
    "Disclaimer": "#",
}

const serviceLinks = {
    "Hand Holding": "#",
    "Tag Along": "#",
}

const socialLinks = [
    { icon: <Facebook />, href: "#" },
    { icon: <Twitter />, href: "#" },
    { icon: <Instagram />, href: "#" },
    { icon: <Linkedin />, href: "#" },
    { icon: <Youtube />, href: "#" },
]

export default function CommercialFooter() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="space-y-4 md:col-span-2">
                        <Image src="https://www.buildersinfo.in/_next/image?url=%2Flogo.png&w=256&q=75" alt="BuildersInfo Logo" width={150} height={40} />
                        <p className="text-sm text-muted-foreground">
                            India's first brokerage-free real estate discovery platform.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                           {Object.entries(companyLinks).map(([text, href]) => (
                                <li key={text}>
                                    <Link href={href} className="text-sm text-muted-foreground hover:text-primary">
                                        {text}
                                    </Link>
                                </li>
                           ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                           {Object.entries(serviceLinks).map(([text, href]) => (
                                <li key={text}>
                                    <Link href={href} className="text-sm text-muted-foreground hover:text-primary">
                                        {text}
                                    </Link>
                                </li>
                           ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Follow Us</h3>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((link, i) => (
                                <Link key={i} href={link.href} className="text-muted-foreground hover:text-primary">
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                         <div className="mt-4 space-y-2 text-sm">
                            <h3 className="font-semibold mb-2">Contact</h3>
                            <a href="mailto:support@buildersinfo.in" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                                <Mail className="h-4 w-4" /> support@buildersinfo.in
                            </a>
                            <a href="tel:+918884886822" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                                <Phone className="h-4 w-4" /> +918884886822
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Buildersinfo.in. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}