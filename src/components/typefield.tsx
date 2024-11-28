"use client";
import { generateWords, getNewWords } from "@/app/actions";
import { useEffect, useState } from "react";

interface TypedCharProps {
  char: string;
  state: "correct" | "incorrect" | "placeholder";
}

export default function Typer({
  words,
  wordCount,
}: {
  words: TypedCharProps[];
  wordCount: number;
}) {
  const [wordList, setWordList] = useState<TypedCharProps[]>(words);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
        if (localStorage.getItem("commandopen") === "true") {
            return;
        }
      if (e.code === "Tab") {
        console.log("Tab pressed");
        e.stopPropagation();
        e.preventDefault();
        generateWords(wordCount).then((newWords) => {
          setWordList(newWords);
        });
      }
      if (e.code === "Escape") {
        e.preventDefault();
        getNewWords();
        return;
      }
      if (e.code === "Backspace") {
        const index = wordList.findIndex(
          (word) => word.state === "placeholder"
        );
        if (index === -1) {
          wordList[wordList.length - 1].state = "placeholder";
          setWordList([...wordList]);
          return;
        }
        if (index === 0) {
          return;
        }
        wordList[index - 1].state = "placeholder";
        setWordList([...wordList]);
      }
      if (wordList.findIndex((word) => word.state === "placeholder") === -1) {
        return;
      }
      if (e.code === "Space") {
        if (
          wordList[
            wordList.findIndex((word) => word.state === "placeholder")
          ].char.trim().length === 0
        ) {
          wordList[
            wordList.findIndex((word) => word.state === "placeholder")
          ].state = "correct";
          setWordList([...wordList]);
        } else {
          wordList[
            wordList.findIndex((word) => word.state === "placeholder")
          ].state = "incorrect";
          setWordList([...wordList]);
        }
      }
      if (
        !(e.metaKey || e.ctrlKey) &&
        "abcdefghijklmnopqrstuvwxyz".includes(e.key.toLowerCase())
      ) {
        const index = wordList.findIndex(
          (word) => word.state === "placeholder"
        );
        if (wordList[index].char === e.key) {
          wordList[index].state = "correct";
          setWordList([...wordList]);
        } else {
          wordList[index].state = "incorrect";
          setWordList([...wordList]);
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordList]);
  return (
    <div className="relative text-center select-none px-12">
      {wordList.map((word, index) => {
        return (
          <span
            key={index}
            className={`${
              word.state === "correct"
                ? "text-primary"
                : word.state === "incorrect"
                ? "text-invalid"
                : "text-secondary"
            }`}
          >
            {word.char}
          </span>
        );
      })}
    </div>
  );
}
