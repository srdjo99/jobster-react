import { ReactElement } from "react";
interface IDefaultStatsState {
  pending?: number;
  interview?: number;
  declined?: number;
}

interface IMonthlyApplications {
  date: string;
  count: number;
}

interface IDefaultStats {
  title: string;
  count: number;
  icon: ReactElement;
  color: string;
  bcg: string;
}

interface IStats {
  defaultStats: IDefaultStatsState;
  monthlyApplications: IMonthlyApplications[];
}

interface IStatItemProps {
  title: string;
  count: number;
  icon: ReactElement;
  color: string;
  bcg: string;
}

interface IStyledStatItemProps {
  color: string;
  bcg: string;
}

export type {
  IStats,
  IDefaultStats,
  IStatItemProps,
  IDefaultStatsState,
  IStyledStatItemProps,
  IMonthlyApplications,
};
