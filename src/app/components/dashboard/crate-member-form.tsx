"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  IMember,
  MemberZodSchema,
  ROLES_VALUES,
} from "@/interfaces/member.iterface";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaselineIcon, ShieldCheck } from "lucide-react";
import { createMember } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
const INITIAL_MEMBER_DATA: IMember = {
  email: "",
  lastName: "",
  name: "",
  password: "",
  role: "BASIC",
  companyName: "",
  userName: "",
  image: "",
  phone: "",
  workhours: [],
};
export default function MemberForm() {
  const { toast } = useToast();
  const form = useForm<IMember>({
    resolver: zodResolver(MemberZodSchema),
    mode: "onChange",
    defaultValues: INITIAL_MEMBER_DATA,
  });
  const onSubmit = async (values: IMember) => {
    const res = await createMember(values);
    if (res.status === 400) {
      alert(res.response.message);
    }
    toast({
      title: "Miembro agregado exitosamente!",
      description: `Se agregó ${values.name} a tu lista de miembros`,
      variant: "default",
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 text-left  h-full max-h-full overflow-auto"
      >
        <section className=" space-y-3">
          <div className="flex flex-col ">
            <p className="font-medium">Informacion de accesso</p>
            <span className="font-light">
              {" "}
              Definir las claves de accesso para {form.getValues("name")}{" "}
              {form.getValues("lastName")}
            </span>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Apellido" {...field} />
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
                  <Input type="email" placeholder="Nombre" {...field} />
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
                <FormLabel>Núemro de celular</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES_VALUES.map((role) => (
                        <SelectItem value={role} key={role}>
                          <div className="flex gap-1 items-center">
                            {role === "ADMIN" ? (
                              <ShieldCheck />
                            ) : (
                              <BaselineIcon />
                            )}
                            {role}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <hr className="border-accent" />

        <section className=" space-y-3">
          <div className="flex flex-col ">
            <p className="font-medium">Informacion de accesso</p>
            <span className="font-light">
              {" "}
              Definir las claves de accesso para {form.getValues("name")}{" "}
              {form.getValues("lastName")}
            </span>
          </div>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de usuario" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="absolute bottom-0 right-0 p-2 w-full">
          <div className="flex gap-2 ">
            <Button type="button" variant={"outline"} className="w-1/4">
              Cancelar
            </Button>
            <Button type="submit" className="flex-grow text-white">
              Crear
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
