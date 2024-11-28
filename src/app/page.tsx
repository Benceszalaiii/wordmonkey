import Typer from "@/components/typefield";
import { generateWords } from "./actions";

export default async function Page() {
  const words = await generateWords(15);
  return (
    <main className="bg-background w-full">
      <h1 className="text-4xl fixed text-primary w-full text-center mt-8 font-mono">
        WordMonkey
      </h1>
      <section className="min-h-screen relative text-2xl w-full flex flex-col justify-center">
        <Typer words={words} wordCount={15} />
      </section>
    </main>
  );
}
