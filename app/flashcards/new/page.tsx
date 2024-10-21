"use client";
import React, { useState } from "react";
import FlashcardForm from "@/app/forms/FlashcardForm";

const NewFlashcardPage = () => {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <FlashcardForm
            type="create"
            $id=""
            question=""
            answer=""
            deck=""
            lastReviewed={new Date()}
            setOpen={setOpen}
          />
        </div>
      </section>
    </div>
  );
};

export default NewFlashcardPage;
