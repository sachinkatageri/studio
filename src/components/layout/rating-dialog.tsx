
"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, Star, CheckCircle, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  rating: z.number().min(1, "Please select a rating."),
  goodThings: z.string().optional(),
  badThings: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

async function submitRating(data: FormData) {
  console.log("Rating submitted:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "Thank you for your feedback!" };
}

const StarRatingInput = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        onClick={() => onChange(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star
                            className={cn(
                                "h-8 w-8 transition-colors",
                                ratingValue <= (hover || value) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
};

function RatingForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      goodThings: "",
      badThings: "",
    },
  });

  async function onSubmit(values: FormData) {
    startTransition(async () => {
      const result = await submitRating(values);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset();
        onSubmitted();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 md:p-0">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarRatingInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goodThings"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 font-semibold">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Good things here
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share what you liked about this property..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="badThings"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Things to improve
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What could be better? Your feedback helps."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Review"}
            </Button>
        </div>
      </form>
    </Form>
  );
}

export function RatingDialog({ open, onOpenChange }: RatingDialogProps) {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="text-left">
            <div className="flex justify-between items-center">
              <DrawerTitle>Rate Property</DrawerTitle>
            </div>
            <DrawerDescription>Share your experience with the community.</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto">
            <RatingForm onSubmitted={() => onOpenChange(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Rate Property</DialogTitle>
          <DialogDescription>Share your experience with the community.</DialogDescription>
        </DialogHeader>
        <RatingForm onSubmitted={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
