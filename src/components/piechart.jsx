import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const PieChartComponent = ({ data }) => {
  // Generate a color for each slice dynamically
  const getColor = (index) => `hsl(${(index * 360) / data.length}, 70%, 50%)`;

  return (
    <ResponsiveContainer width="120%" height={80}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={20}
          outerRadius={30}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={getColor(index)} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
