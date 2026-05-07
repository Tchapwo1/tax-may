import "./globals.css";

export const metadata = {
  title: "Tax Calculator 365",
  description: "UK tax calculators"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
