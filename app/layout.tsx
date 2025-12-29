import "./globals.css";
import "@fortawesome/fortawesome-free/css/all.min.css";
import Footer from "./_components/footer/page";
import Navbar from "./_components/Navbar/page";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <head>
        <title>Shop Mart</title>
      </head>
      <body>
        <Providers>
          <Navbar />
          <main className="pt-16 animate-in fade-in duration-500">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-center" richColors duration={3000} />
        </Providers>
      </body>
    </html>
  );
}
