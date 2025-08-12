import { LeagueDetail } from "@/features/LeagueDetail/LeagueDetail";
import { AppLayout } from "./AppLayout";

export default function LeagueLayout({ children }) {
  return (
    <AppLayout>
      <LeagueDetail />
      {children}
    </AppLayout>
  );
}
