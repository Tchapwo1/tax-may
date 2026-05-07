import { selfAssessmentMetadata } from "@/shared/config/metadata";

export const metadata = selfAssessmentMetadata();

export default function SelfAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
