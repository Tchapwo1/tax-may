import { landlordMetadata } from '@/shared/config/metadata';
import { Suspense } from 'react';

export const metadata = landlordMetadata();

export default function LandlordLayout({
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
