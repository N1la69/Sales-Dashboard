const StatCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: number | string;
  description?: string;
}) => (
  <div className="bg-primary/10 rounded-lg shadow p-4 text-left h-40">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    {description && (
      <h2 className="text-gray-700 text-lg font-semibold">{description}</h2>
    )}
  </div>
);

export default StatCard;
