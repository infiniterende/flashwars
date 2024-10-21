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
    header: () => <div className="pl-4">Change Date</div>,
    cell: ({ row }) => {
      const flashcard = row.original;
      return (
        <div>
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <DateModal {...flashcard} />
        </div>
      );
    },
  },
];
