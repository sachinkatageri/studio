
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Header from "@/components/layout/header";

const colors = [
    { name: "background", bg: "bg-background", text: "text-foreground", code: "0 0% 100%" },
    { name: "foreground", bg: "bg-foreground", text: "text-background", code: "240 10% 3.9%" },
    { name: "card", bg: "bg-card", text: "text-card-foreground", code: "0 0% 100%" },
    { name: "card-foreground", bg: "bg-card-foreground", text: "text-card", code: "240 10% 3.9%" },
    { name: "popover", bg: "bg-popover", text: "text-popover-foreground", code: "0 0% 100%" },
    { name: "popover-foreground", bg: "bg-popover-foreground", text: "text-popover", code: "240 10% 3.9%" },
    { name: "primary", bg: "bg-primary", text: "text-primary-foreground", code: "212 90% 41%" },
    { name: "primary-foreground", bg: "bg-primary-foreground", text: "text-primary", code: "0 0% 98%" },
    { name: "secondary", bg: "bg-secondary", text: "text-secondary-foreground", code: "212 90% 61%" },
    { name: "secondary-foreground", bg: "bg-secondary-foreground", text: "text-secondary", code: "0 0% 98%" },
    { name: "muted", bg: "bg-muted", text: "text-muted-foreground", code: "240 4.8% 95.9%" },
    { name: "muted-foreground", bg: "bg-muted-foreground", text: "text-muted", code: "240 3.8% 46.1%" },
    { name: "accent", bg: "bg-accent", text: "text-accent-foreground", code: "41 93% 58%" },
    { name: "accent-foreground", bg: "bg-accent-foreground", text: "text-accent", code: "240 10% 3.9%" },
    { name: "destructive", bg: "bg-destructive", text: "text-destructive-foreground", code: "0 84.2% 60.2%" },
    { name: "destructive-foreground", bg: "bg-destructive-foreground", text: "text-destructive", code: "0 0% 98%" },
    { name: "border", bg: "bg-border", text: "text-foreground", code: "240 5.9% 90%" },
    { name: "input", bg: "bg-input", text: "text-foreground", code: "240 5.9% 90%" },
    { name: "ring", bg: "bg-ring", text: "text-primary-foreground", code: "212 90% 41%" },
  ];

const spacing = [
  { name: "p-0", size: "0px" },
  { name: "p-1", size: "0.25rem" },
  { name: "p-2", size: "0.5rem" },
  { name: "p-3", size: "0.75rem" },
  { name: "p-4", size: "1rem" },
  { name: "p-5", size: "1.25rem" },
  { name: "p-6", size: "1.5rem" },
  { name: "p-8", size: "2rem" },
  { name: "p-10", size: "2.5rem" },
  { name: "p-12", size: "3rem" },
  { name: "p-16", size: "4rem" },
  { name: "p-20", size: "5rem" },
];

const typography = [
    {
      style: "Headline Extra Bold (h1)",
      class: "text-4xl font-extrabold font-headline tracking-tight",
      font: "Geist Sans",
      size: "36px",
    },
    {
      style: "Headline Bold (h2)",
      class: "text-3xl font-bold font-headline",
      font: "Geist Sans",
      size: "30px",
    },
    {
      style: "Headline Semibold (h3)",
      class: "text-2xl font-semibold font-headline",
      font: "Geist Sans",
      size: "24px",
    },
    {
      style: "Body Large",
      class: "text-lg",
      font: "Geist Sans",
      size: "18px",
    },
    {
      style: "Body Regular",
      class: "",
      font: "Geist Sans",
      size: "16px",
    },
    {
      style: "Body Small (muted)",
      class: "text-sm text-muted-foreground",
      font: "Geist Sans",
      size: "14px",
    },
    {
      style: "Code Font",
      class: "font-code text-sm",
      font: "Geist Mono",
      size: "14px",
    },
  ];

export default function DesignSystemPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight mb-8">
          Design System
        </h1>

        {/* Colors */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-headline mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {colors.map((color) => (
              <div key={color.name}>
                <div
                  className={`h-24 w-full rounded-lg border flex items-center justify-center ${color.bg}`}
                >
                  <span className={`${color.text}`}>Aa</span>
                </div>
                <div className="mt-2 text-sm">
                  <p className="font-semibold">{color.name}</p>
                  <p className="text-muted-foreground font-mono text-xs">{color.code}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-headline mb-6">Typography</h2>
          <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Style</TableHead>
                        <TableHead>Example</TableHead>
                        <TableHead>Font</TableHead>
                        <TableHead>Size</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {typography.map(t => (
                        <TableRow key={t.style}>
                            <TableCell className="font-medium">{t.style}</TableCell>
                            <TableCell>
                                <p className={t.class}>
                                    The quick brown fox jumps over the lazy dog.
                                </p>
                            </TableCell>
                            <TableCell>{t.font}</TableCell>
                            <TableCell>{t.size}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </Card>
        </section>

        {/* Components */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-headline mb-6">Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      You can add components to your app using the cli.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

               <Card>
                <CardHeader>
                    <CardTitle>Accordion</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                            <AccordionContent>
                            Yes. It comes with default styles that matches the other components&apos; aesthetic.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
               </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Input placeholder="Input field" />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                  </div>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Comfortable</Label>
                    </div>
                  </RadioGroup>
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                  </div>
                   <Slider defaultValue={[50]} max={100} step={1} />
                </CardContent>
              </Card>

               <Card>
                    <CardHeader>
                        <CardTitle>Tooltip</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline">Hover me</Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>This is a tooltip!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardContent>
               </Card>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-3xl font-bold font-headline mb-6">Spacing</h2>
          <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Example</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {spacing.map((s) => (
                        <TableRow key={s.name}>
                            <TableCell className="font-mono">{s.name}</TableCell>
                            <TableCell>{s.size}</TableCell>
                            <TableCell>
                            <div className="bg-primary/20 h-6" style={{ width: s.size }}></div>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
