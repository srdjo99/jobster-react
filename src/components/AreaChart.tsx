import { FC } from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { IMonthlyApplications } from "../types/IStats";

const AreaChartComponent: FC<{ data: IMonthlyApplications[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray=" 3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#3b82f6" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
