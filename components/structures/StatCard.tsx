const StatCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: number | string;
  description?: string;
}) => (
  <div className="bg-primary/10 rounded-lg shadow p-4 text-left">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    {description && <p className="text-gray-500">{description}</p>}
  </div>
);

export default StatCard;
