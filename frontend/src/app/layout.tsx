import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[url('/wp2.png')] bg-no-repeat bg-center bg-cover">
        {children}
      </body>
    </html>
  );
}
