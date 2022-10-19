interface IDefaultStats {
  pending?: number;
  interview?: number;
  declined?: number;
}

interface IMonthlyApplications {
  date: string;
  count: number;
}

interface IStats {
  defaultStats: IDefaultStats;
  monthlyApplications: IMonthlyApplications[];
}

export type { IDefaultStats, IMonthlyApplications, IStats };
