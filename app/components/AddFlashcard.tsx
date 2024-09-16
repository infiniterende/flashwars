"use client";

import React, { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import Select from "react-select";

const AddFlashcard = () => {
  const [formData, setFormData] = useState<any>({});
  const [decks, setDecks] = useState<any>();
  console.log(formData);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/decks");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Parse JSON here
      console.log("Data received:", data);
      setDecks(data.decks); // Return parsed data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };
  console.log(formData);
  useEffect(() => {
    fetchData();
  }, []);

  const options = decks?.map((category: any) => ({
    value: category.id,
    label: category.title,
  }));

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    console.log(data);
    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Invalid response: ${response.status}`);
      }
      const resData = await response.json();
      console.log(resData.body);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    // revalidatePath("/");
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <h1 className="text-3xl text-teal-500 font-bold text-center p-8">
        Add Flashcard
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-teal-500 text-lg font-bold mb-2"
            htmlFor="question"
          >
            Question
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="question"
            required
            onChange={handleChange}
            value={formData.question}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-teal-500 text-lg font-bold mb-2"
            htmlFor="answer"
          >
            Answer
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="answer"
            required
            onChange={handleChange}
            value={formData.answer}
          />
        </div>

        <div className="message block mb-4">
          <Select
            name="deckId"
            options={options}
            onChange={(value: any, action: any) => {
              setFormData((prevState: any) => ({
                ...prevState,
                [action.name]: value.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            className="rounded-lg bg-teal-500 text-white py-2 px-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFlashcard;
