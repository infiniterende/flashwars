"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { getAllDecks } from "@/lib/actions/deck.actions";
import { Button } from "../ui/button";
import { FlashcardFormValidation } from "@/lib/validation";
import FlashcardForm from "../forms/FlashcardForm";

import {
  Dialog,
  DialogContent,
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

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className=" text-teal-500">
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
