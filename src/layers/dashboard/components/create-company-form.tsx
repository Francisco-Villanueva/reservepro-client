"use client";
import { CreateCompanyZodSchema, ICreateCompany } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Category, CATEGORY_VALUES } from "@/interfaces/categeory.interface";
import { CategoryCard } from "./category-card";
import { useToast } from "@/components/ui/use-toast";
import { createCompany } from "@/lib/actions";
import { AddressInput } from "@/components/common/address-input";

const INITIAL_COMPANY_DATA: ICreateCompany = {
  address: "",
  category: [],
  name: "",
  email: "",
  image: "",
};
export function CompanyForm() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const { toast } = useToast();
  const form = useForm<ICreateCompany>({
    resolver: zodResolver(CreateCompanyZodSchema),
    mode: "onChange",
    defaultValues: INITIAL_COMPANY_DATA,
  });

  const onSubmit = async (values: ICreateCompany) => {
    await createCompany(values);

    toast({
      title: "Sucursal creada exitosamente!",
      description: `Se agregó ${values.name} a tu lista de sucursales`,
      variant: "default",
    });
  };

  const handleCategories = (newCategory: Category) => {
    let res = [];

    if (categoryList.includes(newCategory)) {
      res = categoryList.filter((cat) => cat !== newCategory);
    } else {
      if (categoryList.length === 3) {
        return form.setError("category", {
          message: "Sólo puedas seleccionar hasta 3 categorías.",
        });
      }
      res = [...categoryList, newCategory];
    }

    form.clearErrors("category");
    form.setValue("category", res);
    setCategoryList(res);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 text-left  h-full max-h-full overflow-auto"
      >
        <section className=" space-y-3">
          <div className="flex gap-3 items-center w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exapmple@email.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <AddressInput
                    handleSelect={(value: string) =>
                      form.setValue("address", value)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorías</FormLabel>
                <FormDescription className="text-xs">
                  Min 1 - Max 3
                </FormDescription>

                <div className="flex w-max space-x-4 py-3 flex-wrap max-w-full gap-2">
                  {CATEGORY_VALUES.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleCategories(category)}
                    >
                      <CategoryCard
                        category={category}
                        selected={categoryList.includes(category)}
                      />
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="absolute bottom-0 right-0 p-2 w-full">
          <div className="flex gap-2 w-1/3 ml-auto ">
            <Button type="submit" className="flex-grow text-white">
              Crear
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
