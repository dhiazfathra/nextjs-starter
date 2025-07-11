"use client";
import { FC } from "react";
import { Button, Form, FormField } from "@/components/atoms";
import { MUTATE_LOGIN_SCHEMA } from "@/components/elements/formSchema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FormInput, RememberAccount } from "@/components/molecules";
import { useRouter } from "next/navigation";

const Page: FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof MUTATE_LOGIN_SCHEMA>>({
    resolver: zodResolver(MUTATE_LOGIN_SCHEMA),
    mode: "onChange",
  });

  const isValueEmail = form.getValues("email");
  const isValuePassword = form.watch("password");

  const isValid = isValueEmail && isValuePassword;

  const onSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <div className="mt-20 md:mt-16 justify-items-center md:w-[412px] md:mx-auto mx-5">
      <p className="font-semibold text-3xl leading-[38px] text-monochrome-950 mt-6 mb-3 text-center">
        Log in
      </p>
      <p className="font-normal text-base leading-6 text-monochrome-650">
        Welcome back! Please enter your details.
      </p>

      <Form {...form}>
        <form className="w-full space-y-2 mt-6">
          <div className="md:px-4 pt-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  id="email"
                  title="Email"
                  type="email"
                  isRequired={true}
                  field={field}
                  placeholder={"Enter your email"}
                  form={form}
                  error={form.formState.errors.email?.message}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput
                  type="password"
                  id="password"
                  title="Password"
                  isRequired={true}
                  field={field}
                  placeholder={"••••••••"}
                  form={form}
                  error={form.formState.errors.password?.message}
                />
              )}
            />
          </div>

          <div className="md:mx-4">
            <FormField
              control={form.control}
              name="checked_tnc"
              render={({ field }) => (
                <RememberAccount id="checked_tnc" field={field} form={form} />
              )}
            />
          </div>

          <div className="md:mx-4">
            <Button
              variant={isValid ? "default" : "outline"}
              type="submit"
              className="w-full cursor-pointer"
              disabled={!isValid}
              onClick={onSubmit}
            >
              Sign In
            </Button>
          </div>

          <div className="flex flex-row gap-2 justify-center mt-8 pt-6">
            <p className="dark:text-white text-sm font-normal leading-5 text-monochrome-650">
              Don’t have an account?
            </p>
            <Link
              href={"/register"}
              className="text-sm font-normal leading-5 text-custom-blue pointer-events-auto	"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
