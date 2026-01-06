
import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';

const DribbbleIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85" />
  </svg>
);


export default function CommercialFooter() {
    return (
        <>
        <footer className="bg-background border-t py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="font-semibold mb-4 text-lg">Services</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Hand Holding</Link></li>
                            <li><Link href="#" className="hover:text-primary">Tag Along</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Company</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><Link href="/terms-and-conditions" className="hover:text-primary">Terms and Conditions</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
                         <ul className="space-y-2 text-muted-foreground">
                            <li><a href="tel:+918884886822" className="hover:text-primary">+918884886822</a></li>
                            <li><a href="mailto:support@buildersinfo.in" className="hover:text-primary">email: support@buildersinfo.in</a></li>
                        </ul>
                        <div className="flex items-center gap-4 mt-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><DribbbleIcon className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
         <div className="bg-accent text-accent-foreground py-4">
            <div className="container mx-auto px-4 text-center text-sm">
                <p>© 2025 - Buildersinfo.in - All Rights Reserved</p>
            </div>
        </div>
        </>
    );
}
