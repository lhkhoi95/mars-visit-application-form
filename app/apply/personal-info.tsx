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

const personalFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  dateOfBirth: z.string().refine(
    (data) => {
      const date = new Date(data);
      const today = new Date();
      return !isNaN(date.getTime()) && date <= today;
    },
    {
      message: "Date of birth must be valid and cannot be in the future.",
    }
  ),
  nationality: z
    .string()
    .min(2, { message: "Nationality must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
});

interface PersonalInfoProps {
  data: PersonalInfo;
  onNext: (values: z.infer<typeof personalFormSchema>) => void;
}

export default function PersonalInfo({ data, onNext }: PersonalInfoProps) {
  const form = useForm<z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      fullName: data?.fullName || "",
      dateOfBirth: data?.dateOfBirth || "",
      nationality: data?.nationality || "",
      email: data?.email || "",
      phone: data?.phone || "",
    },
  });

  const onSubmit = (values: z.infer<typeof personalFormSchema>) => {
    onNext(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container w-full space-y-8"
      >
        <h1 className="text-2xl font-bold">Personal Info</h1>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Kevin Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
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
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="e.g. American" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-4">
          <Button type="button" disabled>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
