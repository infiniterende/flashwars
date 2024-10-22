"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createDeck } from "@/lib/actions/deck.actions";
import CustomFormField from "../ui/CustomFormField";

import { Form } from "@/components/ui/form";
import SubmitButton from "../ui/SubmitButton";
import { DeckFormValidation } from "@/lib/validation";

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

const DeckForm = ({ setOpen }: { setOpen: (open) => void }) => {
  // 1. Define your form.

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof DeckFormValidation>>({
    resolver: zodResolver(DeckFormValidation),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof DeckFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      const { title } = values;
      const deckData = { title };
      const deck = await createDeck(deckData);
      console.log(deck);
      if (deck) {
        setOpen(false);
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
            <h1 className="subheader text-dark-800 text-center  text-2xl ">
              Add Deck
            </h1>
          </section>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            label="Title"
            placeholder=""
          />

          <SubmitButton isLoading={isLoading}>Create</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default DeckForm;
