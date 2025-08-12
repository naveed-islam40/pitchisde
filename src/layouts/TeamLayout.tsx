import { AppLayout } from "./AppLayout";
import { TeamDetail } from "@/features/TeamDetail/TeamDetail";

export default function TeamLayout({ children }) {
  return (
    <AppLayout>
      <TeamDetail />
      {children}
    </AppLayout>
  );
}
