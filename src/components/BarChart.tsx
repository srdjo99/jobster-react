import { FC } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  BarChart,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { IMonthlyApplications } from "../types/IStats";

const BarChartComponent: FC<{ data: IMonthlyApplications[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" stroke="#1e3a8a" fill="#3b82f6" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
