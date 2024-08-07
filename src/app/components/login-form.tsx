"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2Icon, KeyIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { LoaderSpinner } from "./common/loader-spinner";
export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (!res?.ok) {
        throw new Error("Invalid Credentials");
      }
      router.push("/dashboard");
    } catch (error) {
      return toast({
        title: "Invalid credentials",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="rounded-lg flex flex-col gap-8 ">
          <div className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      {...field}
                      placeholder="Enter your email address"
                    />
                    <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      {...field}
                      placeholder="Enter password"
                      type="password"
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white"
            disabled={loading}
            isLoading={loading}
          >
            Login
          </Button>
          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
