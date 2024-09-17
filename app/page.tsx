import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col text-center justify-center">
      <h1 className="text-4xl font-extrabold p-4">
        Create. <span className="text-teal-500">Learn.</span> Memorize.
      </h1>
      <h2 className="text-2xl"> Improve your retention and memory</h2>
      <div className="flex items-center justify-center m-8">
        <img className="" src="/images/bg_image.jpg" alt="bg" width="500px" />
      </div>

      <h2>
        Make a deck{" "}
        <Link href="/decks/new" className="text-teal-600">
          {" "}
          now.{" "}
        </Link>
      </h2>
    </div>
  );
}
