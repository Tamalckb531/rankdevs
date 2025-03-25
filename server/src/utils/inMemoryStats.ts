export interface Stats{
    total: number;
    [key: string]: number;
}

export const inMemoryStats: Record<
    string,
    {
        dailyStats: Stats;
        weeklyStats: Stats;
        monthlyStats: Stats;
    }
    > = {}