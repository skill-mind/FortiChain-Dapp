"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function RevenueChart() {
  return (
    <div className="w-full p-6 bg-[#101011] rounded-lg">
      <h4 className="text-base font-medium text-white mb-6">
        Revenue Over Time
      </h4>
      <div className="h-[320px] w-full [&_*]:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[
              { time: "Jan", value: 0 },
              { time: "Feb", value: 20 },
              { time: "Mar", value: 30 },
              { time: "Apr", value: 50 },
              { time: "May", value: 65 },
              { time: "Jun", value: 95 },
            ]}
          >
            <Tooltip
              cursor={{
                stroke: "#1C1C1C",
                strokeWidth: 1,
              }}
              defaultIndex={3}
              contentStyle={{
                padding: "24px",
                width: "131px",
                backgroundColor: "#101011",
                border: "1px solid #1F1F1F",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: 500,
                fontSize: "16px",
                outline: "none",
              }}
              itemStyle={{
                color: "#0073E6",
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: 400,
              }}
            />
            <XAxis dataKey="time" />
            <YAxis dataKey="value" />
            <Line type="monotone" dataKey="value" stroke="#1F1F1F" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
