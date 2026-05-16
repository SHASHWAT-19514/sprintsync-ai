type TaskCardProps = {
  title: string;
  owner: string;
  priority: string;
  deadline: string;
};

export default function TaskCard({
  title,
  owner,
  priority,
  deadline,
}: TaskCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p><strong>Owner:</strong> {owner}</p>
      <p><strong>Priority:</strong> {priority}</p>
      <p><strong>Deadline:</strong> {deadline}</p>
    </div>
  );
}