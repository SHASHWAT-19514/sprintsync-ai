type BobInsightCardProps = {
  files: string[];
  suggestion: string;
};

export default function BobInsightCard({
  files,
  suggestion,
}: BobInsightCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        IBM Bob Insights
      </h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">
          Affected Files
        </h3>

        <ul className="list-disc pl-5">
          {files.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-2">
          Suggested Debugging Insight
        </h3>

        <p>{suggestion}</p>
      </div>
    </div>
  );
}