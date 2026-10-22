import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";

import { siteMetadata } from "@/shared/config/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteMetadata.defaultTitle,
  description: siteMetadata.defaultDescription,
  metadataBase: new URL(siteMetadata.baseUrl),
};

import { NuqsAdapter } from 'nuqs/adapters/next/app';


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': 'TaxCalculator365',
  'url': 'https://www.taxcalculator365.com',
  'description': 'Professional UK tax modeling engine for PAYE employees, Buy-to-Let landlords, and Sole Traders.',
  'applicationCategory': 'FinanceApplication',
  'operatingSystem': 'All',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'GBP',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </head>
        <body className={inter.className}>
        <NuqsAdapter>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
