"use server";

import { serverMutation } from "../core/server";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  console.warn("NEXT_PUBLIC_BASE_URL is not defined in environment variables");
}

// Create / Publish Book
export const createBook = async (bookData) => {
  if (!bookData) {
    return {
      success: false,
      message: "Book data is required",
    };
  }

  try {
    const res = await serverMutation("/api/books", bookData, "POST");

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to publish book",
      };
    }

    return {
      success: true,
      message: data.message || "Book published successfully",
      data,
    };
  } catch (error) {
    console.error("Error creating book:", error);

    return {
      success: false,
      message: "Something went wrong while publishing the book",
    };
  }
};
