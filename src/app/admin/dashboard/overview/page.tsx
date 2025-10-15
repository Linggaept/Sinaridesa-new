"use client";

import { getDashboardData } from "@/app/services/dashboardService";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { useCredentials } from "@/hooks/use-cred";
import { useEffect, useState } from "react";

interface DashboardData {
  total: {
    teams: number;
    courses: number;
    events: number;
    users: number;
    certificates: number;
  };
  last7days: {
    teams: number;
    courses: number;
    events: number;
    users: number;
    certificates: number;
  };
  last30days: {
    teams: number;
    courses: number;
    events: number;
    users: number;
    certificates: number;
  };
  last90days: {
    teams: number;
    courses: number;
    events: number;
    users: number;
    certificates: number;
  };
}

export default function Page() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useCredentials();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardData(token!);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5 px-4 lg:px-6">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          ) : data ? (
            <SectionCards data={data.total} />
          ) : (
            <div className="px-4 lg:px-6 text-red-500">{error || "No data available."}</div>
          )}
          <div className="px-4 lg:px-6">
            {loading ? (
                <Skeleton className="h-[350px]" />
            ) : data ? (
                <ChartAreaInteractive data={data} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
