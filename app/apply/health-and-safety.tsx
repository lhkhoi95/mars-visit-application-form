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
import { Checkbox } from "@/components/ui/checkbox";

const healthAndSafetySchema = z.object({
  healthDeclaration: z.boolean().refine((data) => data, {
    message: "You must agree to the declaration.",
  }),
  emergencyContactName: z
    .string()
    .min(2, { message: "Emergency contact name is required." }),
  emergencyContactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  medicalConditions: z.string().min(2, { message: "Medical conditions." }),
});

interface HealthAndSafetyProps {
  data: HealthAndSafety | null;
  onNext: (values: z.infer<typeof healthAndSafetySchema>) => void;
  onBack: () => void;
}

export default function HealthAndSafety({
  data,
  onNext,
  onBack,
}: HealthAndSafetyProps) {
  const form = useForm<z.infer<typeof healthAndSafetySchema>>({
    resolver: zodResolver(healthAndSafetySchema),
    defaultValues: {
      healthDeclaration: data?.healthDeclaration || false,
      emergencyContactName: data?.emergencyContactName || "",
      emergencyContactPhone: data?.emergencyContactPhone || "",
      medicalConditions: data?.medicalConditions || "",
    },
  });

  const onSubmit = (values: z.infer<typeof healthAndSafetySchema>) => {
    onNext(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container w-full space-y-8"
      >
        <h1 className="text-2xl font-bold">Health and Safety</h1>
        <FormField
          control={form.control}
          name="emergencyContactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                Please provide the name of an emergency contact.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emergencyContactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormDescription>
                Please provide the phone of an emergency contact.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medicalConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical Conditions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List any relevant medical conditions, allergies or N/A if none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                List any medical conditions or allergies that may be relevant
                during your travel.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="healthDeclaration"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I declare that I am in good health and fit to travel
                </FormLabel>
                <FormDescription>
                  Please confirm that you are in good health and have no known
                  conditions that would prevent you from traveling.
                </FormDescription>
                <FormMessage />
              </div>
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
