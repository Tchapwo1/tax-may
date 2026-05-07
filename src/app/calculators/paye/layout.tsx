import { payeMetadata } from '@/shared/config/metadata';

export const metadata = payeMetadata();

export default function PayeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
