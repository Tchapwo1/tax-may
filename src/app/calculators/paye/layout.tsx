import { payeMetadata } from '@/shared/config/metadata';
import { Suspense } from 'react';

export const metadata = payeMetadata();

export default function PayeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}
