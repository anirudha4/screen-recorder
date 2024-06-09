import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-50")}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'text-sm font-medium',
          }} />
      </body>
    </html>
  );
}
