import Link from "next/link";
import Image from "next/image";
import RegisterForm from "./forms/RegisterForm";
export default function Home() {
  return (
    <div className="flex h-screen max-h-screen text-3xl text-white">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <h2 className="text-teal-500 my-6 text-2xl">flashwars </h2>

          <RegisterForm />

          <div className="text-14-regular flex justify-between mt-20">
            {" "}
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 flashwars
            </p>{" "}
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/library.jpg"
        height={1000}
        width={1000}
        alt="library"
        className="side-img max-w-[50%] opacity-80"
      />
    </div>
  );
}
