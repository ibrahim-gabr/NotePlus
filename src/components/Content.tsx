import React from "react";
import { FilterIcon } from "@heroicons/react/outline";
import NoteCards from "./NoteCards";

function Content() {
  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none bg-white rounded-lg w-full p-8">
      {/* header */}
      <div className="flex justify-between  items-center mt-4">
      <div className="text-3xl font-medium">Your Notes</div>

        <div className=' p-2'>
          {/* <FilterIcon className="h-6 w-6" /> */}
        </div>
      </div>
   
      {/* note cards */}
      <NoteCards />
     
    </main>
  );
}

export default Content;
