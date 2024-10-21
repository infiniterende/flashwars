"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  createFlashcard,
  updateFlashcard,
} from "@/lib/actions/flashcard.actions";
import { getAllDecks } from "@/lib/actions/deck.actions";
import CustomFormField from "../ui/CustomFormField";

import { Form } from "@/components/ui/form";
import SubmitButton from "../ui/SubmitButton";
import { UserFormValidation, FlashcardFormValidation } from "@/lib/validation";
import { SelectItem } from "@/components/ui/select";
import { create } from "domain";

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

const FlashcardForm = ({
  type,
  $id,
  question,
  answer,
  lastReviewed,
  deck,
  setOpen,
}: {
  type: "create" | "edit";
  $id: any;
  question: any;
  answer: any;
  lastReviewed: Date;
  deck: any;
  setOpen: (open: boolean) => void;
}) => {
  // 1. Define your form.

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [decks, setDecks] = useState<any>();

  const form = useForm<z.infer<typeof FlashcardFormValidation>>({
    resolver: zodResolver(FlashcardFormValidation),
    defaultValues: {
      question: question ? question : "",
      answer: answer ? answer : "",
      deck: deck ? deck : "",
      lastReviewed: lastReviewed ? lastReviewed : new Date(),
    },
  });

  const fetchDecks = async () => {
    const allDecks = await getAllDecks();
    setDecks(allDecks.documents);
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  console.log(decks);

  const router = useRouter();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof FlashcardFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      if (type === "create") {
        const { question, answer, deck, lastReviewed } = values;
        const currentDeck = decks?.find((d: any) => d.title === deck);
        const deckId = currentDeck.$id;
        console.log("d", deckId);
        const flashcardData = { question, answer, deck: deckId, lastReviewed };

        console.log(flashcardData);
        const flashcard = await createFlashcard(flashcardData);
        console.log(values);
        console.log(flashcard);
        if (flashcard) {
          router.push(`/decks/${deck}`);
        }
      } else {
        const deck = decks.find((deck: any) => deck.title === values?.deck).$id;
        console.log("d", deck);
        console.log("date", values?.lastReviewed);
        const flashcard = {
          flashcardId: $id || "",
          question: values?.question,
          answer: values?.answer,
          lastReviewed: new Date(values?.lastReviewed),
          deck: deck,
        };
        const updatedFlashcard = await updateFlashcard(flashcard);
        console.log("upd", updatedFlashcard);
        if (updatedFlashcard) {
          setOpen(false);
          form.reset();
        }
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
              Add Flashcard
            </h1>
          </section>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="question"
            label="Question"
            placeholder=""
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="answer"
            placeholder=""
            label="Answer"
          />

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="deck"
            placeholder=""
            label="Deck"
          >
            {decks &&
              decks?.map((deck: any) => (
                <SelectItem key={deck.title} value={deck.title}>
                  <p>{deck.title}</p>
                </SelectItem>
              ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="lastReviewed"
            label="Last Reviewed"
            showTimeSelect
            dateFormat="MM/dd/yyyy - h:mm aa"
          ></CustomFormField>

          <SubmitButton isLoading={isLoading}>Create</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default FlashcardForm;
