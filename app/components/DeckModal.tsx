"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import DeckForm from "../forms/DeckForm";
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

const DeckModal = () => {
  // 1. Define your form.

  const [open, setOpen] = useState(false);

  // 2. Define a submit handler.

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className=" w-1/6 flex mx-0 my-8 bg-teal-500 text-center  text-white p-4"
        >
          <p className="text-center">Add Deck</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">Create Deck</DialogTitle>
        </DialogHeader>

        <DeckForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default DeckModal;
