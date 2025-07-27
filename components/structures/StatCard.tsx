const StatCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: number | string;
  description?: string;
}) => (
  <div className="bg-indigo-300/10 dark:bg-indigo-700/10 rounded-lg shadow p-4 text-left h-40">
    <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
      {title}
    </h2>
    <p className="text-2xl font-bold text-black dark:text-white">
      {typeof value === "number" ? value.toLocaleString() : value}
    </p>
    {description && (
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
        {description}
      </h2>
    )}
  </div>
);

export default StatCard;
