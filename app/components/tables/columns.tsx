"use client";

import { ColumnDef } from "@tanstack/react-table";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import DateModal from "../DateModal";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Flashcard = {
  $id: string;
  question: string;
  answer: string;
  deck: string;
  lastReviewed: Date;
};

export const columns: ColumnDef<Flashcard>[] = [
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => {
      const flashcard = row.original;
      return (
        <p className="text-14-regular min-w-[250px]">{flashcard.question}</p>
      );
    },
  },
  {
    accessorKey: "lastReviewed",
    header: "Date Reviewed",
    cell: ({ row }) => {
      const flashcard = row.original;
      return (
        <p className="text-14-regular min-w-[200px]">
          {formatDateTime(flashcard.lastReviewed).dateTime}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4 p-2">Edit</div>,
    cell: ({ row }) => {
      const flashcard = row.original;
      return (
        <div className="min-w-[100px] flex flex-row">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2 text-teal-500"
          />
          <DateModal {...flashcard} />
        </div>
      );
    },
  },
];
