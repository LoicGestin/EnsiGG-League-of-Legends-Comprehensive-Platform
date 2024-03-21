import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 bg-[url('/opacity-changed-wp2.png')] bg-no-repeat bg-center bg-cover bg-fixed"  style={{opacity:"98%"}}>
        {children}
      </body>
    </html>
  );
}
