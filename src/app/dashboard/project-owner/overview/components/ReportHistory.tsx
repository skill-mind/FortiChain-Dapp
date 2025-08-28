"use client";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const dummy_users = [
  {
    Reports: 2,
    Month: "Jan",
  },
  {
    Reports: 4,
    Month: "Feb",
  },
  {
    Reports: 1,
    Month: "Mar",
  },
  {
    Reports: 0,
    Month: "Apr",
  },
  {
    Reports: 6,
    Month: "May",
  },
  {
    Reports: 1,
    Month: "Jun",
  },
];

function ReportHistory() {
  return (
    <div className="w-full p-6 bg-[#101011] rounded-lg">
      <h4 className="text-base font-medium text-white mb-6">Report History</h4>
      <div className="h-[320px] w-full [&_*]:outline-none">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            accessibilityLayer
            barCategoryGap="10%"
            barGap={4}
            data={dummy_users}
            height={300}
            syncMethod="index"
            barSize={24}
          >
            <XAxis dataKey="Month" />
            <YAxis yAxisId="Reports" />
            <Tooltip
              cursor={{
                fill: "#1C1C1C",
              }}
              defaultIndex={1}
              contentStyle={{
                padding: "24px",
                backgroundColor: "#101011",
                border: "1px solid #1F1F1F",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: 500,
                fontSize: "16px",
                outline: "none",
              }}
              itemStyle={{
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: 400,
              }}
            />
            <Bar
              dataKey="Reports"
              fill="#0073E6"
              yAxisId="Reports"
              radius={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ReportHistory;
