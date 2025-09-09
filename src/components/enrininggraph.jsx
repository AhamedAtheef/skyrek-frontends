
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Keep your original tooltip design
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <p className="text-sm text-gray-500">{`Week: ${label}`}</p>
        <p className="text-lg font-semibold text-gray-900">{`Revenue: Rs.${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const EarningsGraph = ({ orders }) => {
  // Group revenue per week
  const revenuePerWeek = {};
  orders.forEach(order => {
    const date = new Date(order.date);
    const week = `${date.getFullYear()}-W${Math.ceil((date.getDate() + 6) / 7)}`; // simple week calculation
    revenuePerWeek[week] = (revenuePerWeek[week] || 0) + order.total;
  });

  // Convert object to array for chart
  const data = Object.keys(revenuePerWeek).map(week => ({
    name: week,
    revenue: revenuePerWeek[week]
  }));

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md ">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Total Earnings Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value}`} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#DB2777"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsGraph;
