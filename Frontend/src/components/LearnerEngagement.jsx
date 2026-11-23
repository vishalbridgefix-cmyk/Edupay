
function LearnerEngagement({ data }) {
  const { months, enrollment, completion } = data;

  const getX = (i) => 45 + (i * 660) / 11;
  const getY = (value) => 240 - (value * 2);

  const getPoints = (values) =>
    values.map((value, i) => `${getX(i)},${getY(value)}`).join(" ");

  return (
    <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-800">
        Learner Engagement
      </h2>

      <p className="text-[11px] text-gray-400 mt-1">
        Enrollment and lesson completion - last 12 months
      </p>

      <div className="flex gap-5 mt-4 text-xs">
        <span className="text-[#7556e8]">● Enrollment</span>
        <span className="text-[#20b8a6]">● Completion</span>
      </div>

      <div className="mt-4 border border-gray-100 rounded-xl p-3">
        <svg viewBox="0 0 720 280" className="w-full h-auto">

          {[40, 80, 120, 160, 200, 240].map((y, i) => (
            <g key={y}>
              <line
                x1="45"
                y1={y}
                x2="705"
                y2={y}
                stroke="#eeeeF5"
              />
              <text
                x="35"
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#9ca3af"
              >
                {100 - i * 20}
              </text>
            </g>
          ))}

          {months.map((month, i) => (
            <text
              key={month}
              x={getX(i)}
              y="265"
              textAnchor="middle"
              fontSize="10"
              fill="#9ca3af"
            >
              {month}
            </text>
          ))}

          <polyline
            points={getPoints(enrollment)}
            fill="none"
            stroke="#7556e8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polyline
            points={getPoints(completion)}
            fill="none"
            stroke="#20b8a6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {[enrollment, completion].map((values, index) =>
            values.map((value, i) => (
              <circle
                key={`${index}-${i}`}
                cx={getX(i)}
                cy={getY(value)}
                r="3"
                fill={index === 0 ? "#7556e8" : "#20b8a6"}
              />
            ))
          )}

        </svg>
      </div>
    </div>
  );
}

export default LearnerEngagement;
