import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <header className=" shadow p-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}
