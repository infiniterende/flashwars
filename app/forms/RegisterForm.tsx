"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  createAccount,
  createUser,
  loginUser,
} from "@/lib/actions/users.actions";
import CustomFormField from "../ui/CustomFormField";

import { Form } from "@/components/ui/form";
import SubmitButton from "../ui/SubmitButton";
import { UserFormValidation } from "@/lib/validation";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD_INPUT = "password",
}

const RegisterForm = () => {
  // 1. Define your form.

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      const { name, email, password } = values;
      const userData = { name, email, password };
      console.log(userData);
      const newUser = await createUser(userData);
      console.log(newUser);
      const loginSession = await loginUser({ email, password });
      if (loginSession) {
        router.push("/decks");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="subheader text-dark-800">
              Start making flashcards! 📚{" "}
            </h1>
          </section>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            label="Full Name"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            placeholder="johndoe@gmail.com"
            label="Email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PASSWORD_INPUT}
            control={form.control}
            name="password"
            placeholder=""
            label="Password"
          />

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
