// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <h1 className="text-5xl font-bold text-blue-600">
//         SprintSync AI
//       </h1>
//     </main>
//   );
// }

import TranscriptInput from "@/app/components/TranscriptInput";

export default function Home() {
  return (
    <main>
      <h1>SprintSync AI</h1>

      <TranscriptInput />
    </main>
  );
}