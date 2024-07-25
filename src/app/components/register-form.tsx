"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2Icon, KeyIcon, Mail, HouseIcon } from "lucide-react";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ITentant, ZodTenantSchema } from "@/interfaces/member.iterface";
import { AuthServices } from "@/services/auth.services";

const EMPTY_TENANT_DATA: ITentant = {
  email: "",
  lastName: "",
  name: "",
  password: "",
  role: "ADMIN",
  companyName: "",
  userName: "",
  image: "",
};
export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<ITentant>({
    resolver: zodResolver(ZodTenantSchema),
    defaultValues: EMPTY_TENANT_DATA,
  });

  const onSubmit = async (values: ITentant) => {
    try {
      await AuthServices.register(values);
      router.push("/login");
    } catch (error) {
      //@ts-ignore
      if (error.response.data.message) {
        //@ts-ignore
        alert(error.response.data.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-4 ">
          <div className="w-full flex flex-col gap-4">
            <div className="flex gap-4 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <Label htmlFor="email">Name</Label>
                    <div className="relative ">
                      <Input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                        {...field}
                        placeholder="Enter your first name"
                      />
                      <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <Label htmlFor="email">Last Name</Label>
                    <div className="relative">
                      <Input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        {...field}
                        placeholder="Enter your last name"
                      />
                      <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
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
                      placeholder="example@email.com"
                    />
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Company Name</Label>
                  <div className="relative">
                    <Input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      {...field}
                      placeholder="Name of your company"
                    />
                    <HouseIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex gap-4 w-full">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <Label htmlFor="password">User Name</Label>
                    <div className="relative">
                      <Input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        {...field}
                        placeholder="user name"
                      />
                      <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        {...field}
                        placeholder="******"
                        type="password"
                      />
                      <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full text-white">
            Create account
          </Button>
          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
