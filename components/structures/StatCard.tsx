const StatCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value.toLocaleString()}</p>
    </div>
  );
};

export default StatCard;
