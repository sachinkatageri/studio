
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
    {
        question: "How many projects is the Prestige Group working on currently?",
        answer: "Prestige Group is currently working on multiple projects across various cities. For the most up-to-date information, please visit our official website or contact our sales team."
    },
    {
        question: "Who undertakes Prestige Developer's CSR projects?",
        answer: "Prestige Group's CSR activities are managed by the Prestige Foundation, which focuses on education, healthcare, and community development."
    },
    {
        question: "How old is Prestige Group?",
        answer: "Prestige Group was founded in 1986, making it over three decades old in the real estate industry."
    },
    {
        question: "Which is the best builder in Bengaluru?",
        answer: "While 'best' is subjective, Prestige Group is widely recognized as one of the top and most reputable builders in Bengaluru, known for its quality, innovation, and customer satisfaction."
    },
    {
        question: "How are the working conditions at Prestige Group?",
        answer: "Prestige Group is known for its professional work environment and commitment to employee well-being, fostering a culture of growth and collaboration."
    }
];

export default function FAQ() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-left">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
