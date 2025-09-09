// MetricCard.jsx
const MetricCard = ({ title, value, change, changeColor, icon, children }) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div className="p-2 rounded-full bg-pink-100 text-pink-500">{icon}</div>}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {children} {/* For the chart/graph */}
      </div>
      <div className={`mt-2 text-sm font-medium ${changeColor === 'green' ? 'text-green-500' : changeColor === 'red' ? 'text-red-500': 'hidden'}`}>
        <span className="inline-flex items-center">
          {changeColor === 'green' ? (
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          {change}
        </span>
      </div>
    </div>
  );
};

export default MetricCard;