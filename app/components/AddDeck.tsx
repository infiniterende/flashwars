"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddFlashcard = () => {
  const [formData, setFormData] = useState<any>({});
  console.log(formData);

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log(data);
    try {
      const response = await fetch("/api/decks", {
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
        Add Deck
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-teal-500 text-lg font-bold mb-2"
            htmlFor="deck"
          >
            Deck
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            required
            onChange={handleChange}
            value={formData.title}
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
