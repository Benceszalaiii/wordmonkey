"use server"
import { revalidatePath } from "next/cache";

export async function generateWords(wordCount: number) {
  const fetched = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${wordCount}&lang=en`
  );
  const words = await fetched.json();
  return words
    .join(" ")
    .split("")
    .map((word: string) => {
      return { char: word, state: "placeholder" };
    });
}

export async function getNewWords() {
  revalidatePath("/", "page");
}
