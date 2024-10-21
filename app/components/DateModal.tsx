"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createFlashcard } from "@/lib/actions/flashcard.actions";
import { getAllDecks } from "@/lib/actions/deck.actions";
import CustomFormField from "../ui/CustomFormField";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import SubmitButton from "../ui/SubmitButton";
import { UserFormValidation, FlashcardFormValidation } from "@/lib/validation";
import { SelectItem } from "@/components/ui/select";
import FlashcardForm from "../forms/FlashcardForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const DateModal = ({
  $id,
  question,
  answer,
  lastReviewed,
  deck,
}: {
  $id: any;
  question: any;
  answer: any;
  lastReviewed: Date;
  deck: any;
}) => {
  // 1. Define your form.

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const [decks, setDecks] = useState<any>();

  const form = useForm<z.infer<typeof FlashcardFormValidation>>({
    resolver: zodResolver(FlashcardFormValidation),
    defaultValues: {
      question: "",
      answer: "",
      deck: "",
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
      const { question, answer, deck } = values;
      const currentDeck = decks?.find((d: any) => d.title === deck);
      const deckId = currentDeck.$id;
      console.log("d", deckId);
      const flashcardData = { question, answer, deck: deckId };

      console.log(flashcardData);
      const flashcard = await createFlashcard(flashcardData);
      console.log(values);
      console.log(flashcard);
      if (flashcard) {
        router.push(`/decks/${deck}`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className={`capitalize "text-teal-500"}`}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">Edit Flashcard</DialogTitle>
        </DialogHeader>

        <FlashcardForm
          type="edit"
          $id={$id}
          question={question}
          answer={answer}
          deck={deck}
          lastReviewed={lastReviewed}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DateModal;
