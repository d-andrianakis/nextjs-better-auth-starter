'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  id: z.string().min(1, "Id is required"),
  value: z.string().min(1, "Value is required"),
  identifier: z.string().email("Invalid email"),
  createdAt: z.date({
    required_error: "A date is required.",
  }),
  updatedAt: z.date({
    required_error: "A date is required.",
  }),
});

export default function EditOrderForm({ order, onUpdated }) {

  const orderId = order?.id;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: order?.id || "",
      identifier: order?.identifier || "",
      value: order?.value || "",
      createdAt: order?.createdAt ? new Date(order.createdAt) : null,
      updatedAt: order?.updatedAt ? new Date(order.updatedAt) : null,
    },
  });

  useEffect(() => {
    if (order) {
      form.reset({
        id: order.id,
        identifier: order.identifier,
        value: order.value,
        createdAt: order.createdAt ? new Date(order.createdAt) : null,
        updatedAt: order.updatedAt ? new Date(order.updatedAt) : null,
      });
    }
  }, [order, form]);

  async function onSubmitPopoverForm(data) {
    try {
      // Always submit the correct orderId
      const payload = { ...data, id: orderId };
      const res = await fetch(`/api/orders/edit/${orderId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

        let result;
        try {
            result = await res.json();
        } catch {
            result = { success: false, error: "Invalid JSON response" };
        }

        if (res.ok && typeof onUpdated === "function") {
            onUpdated();
        }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitPopoverForm)} className="space-y-4 p-4 max-w-md mx-auto bg-white rounded-xl shadow-md" suppressHydrationWarning>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order id</FormLabel>
              <FormControl>
                <Input placeholder="Order id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order value</FormLabel>
              <FormControl>
                <Input placeholder="Order value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identifier</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Created At</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Order Created at
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="updatedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Updated At</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Order Updated at
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}