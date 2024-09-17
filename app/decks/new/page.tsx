"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AddDeckPage = () => {
  const [showModal, setShowModal] = useState<any>(false);
  const [formData, setFormData] = useState<any>({});
  const [decks, setDecks] = useState<any>([]);

  console.log(formData);
  console.log(showModal);
  console.log(decks);
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

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="flex m-auto justify-center bg-teal-600 p-4 py-20 border-gray-400 shadow-md rounded-lg w-3/4">
      {" "}
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label
            className="block text-white text-2xl font-bold mb-2 text-center"
            htmlFor="deck"
          >
            Add Deck
          </label>
          <input
            className="shadow appearance-none border rounded w-full px-8 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            required
            onChange={handleChange}
            placeholder="Title"
            value={formData.title}
          />
        </div>

        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDeckPage;
