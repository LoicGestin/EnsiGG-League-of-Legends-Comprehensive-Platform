import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 bg-[url('/wp.webp')] bg-[length:100%] bg-no-repeat">
        {children}
      </body>
    </html>
  );
}
