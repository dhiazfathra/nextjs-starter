"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/molecules";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ScrollArea } from "@/components/atoms";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const blank = pathname == "/login";

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            inter.className,
            "bg-monochrome-800 dark:bg-monochrome-600 no-scrollbar"
          )}
        >
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <QueryClientProvider client={queryClient}>
            {/* <AuthContextProvider> */}
            <div>
              {blank ? (
                <>{children}</>
              ) : (
                <SidebarProvider>
                  <div className="flex-shrink-0">
                    <AppSidebar />
                  </div>
                  <main className="flex-grow bg-white dark:bg-black">
                    <SidebarHeader>
                      <div className="md:hidden flex flex-row justify-between items-center w-screen p-4 bg-white dark:bg-monochrome-800 shadow">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-base leading-6 text-black dark:text-white">
                            Nakes
                          </p>
                        </div>
                        <SidebarTrigger className="md:hidden" />
                      </div>
                    </SidebarHeader>
                    <div className="my-6 md:m-0 flex-1 overflow-y-auto">
                      <NuqsAdapter>
                        <ScrollArea>{children}</ScrollArea>
                      </NuqsAdapter>
                    </div>
                  </main>
                </SidebarProvider>
              )}
            </div>
            {/* </AuthContextProvider> */}
          </QueryClientProvider>
          {/* </ThemeProvider> */}
        </body>
      </html>
    </>
  );
}
