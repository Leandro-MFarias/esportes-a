// import Link from "next/link";
// import { LogoutButton } from "./_components/logout-button";
import { NavBar } from "./_components/header";

export default function Home() {
  return (
    <div className="h-screen">
      <NavBar />

      <div className="flex justify-center pt-10">
        <button className="bg-violet-700 px-10 py-3 rounded-2xl">
          Novo Post
        </button>
      </div>
    </div>
  );
}
