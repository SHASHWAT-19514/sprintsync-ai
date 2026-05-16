import TranscriptInput from "@/app/components/TranscriptInput";
import TaskCard from "@/app/components/TaskCard";
import BobInsightCard from "@/app/components/BobInsightCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-bold mb-6">
        SprintSync AI
        
      </h1>
      <p className="text-gray-600 mb-8">
  Convert engineering meeting discussions into actionable development tasks using AI and IBM Bob insights.
</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TranscriptInput />

        <div>
          <div>
  <TaskCard
    title="Fix Login API"
    owner="Rahul"
    priority="High"
    deadline="Friday"
  />

  <TaskCard
    title="Regression Testing"
    owner="QA Team"
    priority="Medium"
    deadline="Wednesday"
  />

  <BobInsightCard
    files={[
      "authMiddleware.js",
      "loginController.ts",
      "sessionValidator.ts",
    ]}
    suggestion="Recent JWT validation changes may be causing session parsing failures."
  />
</div>
        </div>
      </div>
    </main>
  );
}
