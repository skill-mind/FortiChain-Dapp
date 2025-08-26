"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const dummy_users = [
  {
    amt: 1400,
    month: "Jan",
    "Project Owners": 1,
    Researchers: 2,
    Validators: 1,
  },
  {
    amt: 1400,
    month: "Feb",
    "Project Owners": 1,
    Researchers: 5,
    Validators: 3,
  },
  {
    amt: 1506,
    month: "Mar",
    "Project Owners": 3,
    Researchers: 10,
    Validators: 4,
  },
  {
    amt: 989,
    month: "Apr",
    "Project Owners": 3,
    Researchers: 10,
    Validators: 4,
  },
  {
    amt: 1228,
    month: "May",
    "Project Owners": 5,
    Researchers: 11,
    Validators: 4,
  },
  {
    amt: 1100,
    month: "Jun",
    "Project Owners": 6,
    Researchers: 8,
    Validators: 2,
  },
];

function UserGrowthChart() {
  return (
    <div className="w-full p-6 bg-[#101011] rounded-lg">
      <h4 className="text-base font-medium text-white mb-6">User Growth</h4>
      <div className="h-[320px] w-full [&_*]:outline-none">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            accessibilityLayer
            barCategoryGap="10%"
            barGap={4}
            data={dummy_users}
            height={300}
            syncMethod="index"
            barSize={8}
          >
            <XAxis dataKey="month" />
            <YAxis yAxisId="Researchers" />
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
              dataKey="Project Owners"
              fill="#0073E6"
              yAxisId="Project Owners"
              radius={2}
            />
            <Bar
              dataKey="Researchers"
              fill="#00E6B0"
              yAxisId="Researchers"
              radius={2}
            />
            <Bar
              dataKey="Validators"
              fill="#00C0E6"
              yAxisId="Validators"
              radius={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserGrowthChart;
