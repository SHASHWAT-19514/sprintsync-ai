// export default function TranscriptInput() {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">
//         Engineering Meeting Transcript
//       </h2>

//       <textarea
//         className="w-full h-80 border rounded-xl p-4 outline-none resize-none"
//         placeholder="Paste engineering meeting transcript here..."
//       />

//       <button className="mt-4 w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
//         Generate Engineering Tasks
//       </button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function TranscriptInput() {
  const [transcript, setTranscript] = useState("");

  const handleGenerate = async () => {
    const response = await fetch("/api/generate-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript }),
    });

    const data = await response.json();

    console.log(data);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        Engineering Meeting Transcript
      </h2>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="w-full h-80 border rounded-xl p-4 outline-none resize-none"
        placeholder="Paste engineering meeting transcript here..."
      />

      <button
        onClick={handleGenerate}
        className="mt-4 w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
      >
        Generate Engineering Tasks
      </button>
    </div>
  );
}