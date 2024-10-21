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

const FlashcardModal = () => {
  // 1. Define your form.

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  // 2. Define a submit handler.

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className=" w-1/6 flex mx-0 my-8 bg-teal-500 text-center  text-white p-4"
        >
          <p className="text-center">Add Flashcard</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">Create Flashcard</DialogTitle>
        </DialogHeader>

        <FlashcardForm
          type="create"
          $id=""
          question=""
          answer=""
          deck=""
          lastReviewed={new Date()}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FlashcardModal;
