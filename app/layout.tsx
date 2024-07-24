import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryClientProvider from "@/providers/query-provider";
// Asegúrate de que la ruta sea correcta

const inter = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "SIGEAC",
  description: "Sistema de Gestión Aeronáutica Civil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/logo.png" sizes="any" />
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
