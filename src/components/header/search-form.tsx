"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

const SearchForm: FC = () => {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const q = String(fd.get("q") || "").trim();
        const url = q ? `/?query=${encodeURIComponent(q)}` : "/";
        router.push(url);
      }}
      className="flex  gap-2 mx-3 py-2 px-4 rounded-full border border-zinc-300 md:w-1/2"
    >
      <button type="submit" className="text-xl text-zinc-700 cursor-pointer">
        <CiSearch />
      </button>

      <input
        type="text"
        name="q"
        placeholder="Search for a product or category..."
        className="outline-none text-zinc-800 w-full"
      />
    </form>
  );
};

export default SearchForm;
