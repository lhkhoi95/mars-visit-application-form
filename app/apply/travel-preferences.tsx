import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const travelPreferencesSchema = z
  .object({
    departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Please use YYYY-MM-DD format.",
    }),
    returnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Please use YYYY-MM-DD format.",
    }),
    accommodation: z.string().min(2, {
      message: "Accommodation preference must be at least 2 characters.",
    }),
    specialRequest: z.string().min(2, {
      message: "Special request must be at least 2 characters or N/A if none.",
    }),
  })
  .refine(
    (data) => {
      const departure = new Date(data.departureDate);
      const returnDate = new Date(data.returnDate);
      return departure < returnDate;
    },
    {
      message: "Departure date must be before return date",
      path: ["returnDate"],
    }
  );

interface TravelPreferencesProps {
  data: TravelPreferences;
  onNext: (values: z.infer<typeof travelPreferencesSchema>) => void;
  onBack: () => void;
}

export default function TravelPreferences({
  data,
  onNext,
  onBack,
}: TravelPreferencesProps) {
  const form = useForm<z.infer<typeof travelPreferencesSchema>>({
    resolver: zodResolver(travelPreferencesSchema),
    defaultValues: {
      departureDate: data?.departureDate || "",
      returnDate: data?.returnDate || "",
      accommodation: data?.accommodation || "",
      specialRequest: data?.specialRequest || "",
    },
  });

  const onSubmit = (values: z.infer<typeof travelPreferencesSchema>) => {
    onNext(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container w-full space-y-8"
      >
        <h1 className="text-2xl font-bold">Travel Preferences</h1>
        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  {...field}
                />
              </FormControl>
              <FormDescription>Please use YYYY-MM-DD format.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  min={new Date().toISOString().split("T")[0]}
                />
              </FormControl>
              <FormDescription>Please use YYYY-MM-DD format.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accommodation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accommodation Preference</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Hotel, Hostel, Airbnb" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialRequest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special requests or additional information or N/A if none."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-4">
          <Button type="button" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
