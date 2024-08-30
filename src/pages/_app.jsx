import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { useRouter } from "next/router";
import { AuthProvider } from "@/features/auth/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
  },
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const noNavbarFooter = [
    "/auth/login",
    "/auth/register",
    "/exceptions/unauthorized",
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          {!noNavbarFooter.includes(router.pathname) && <Navbar />}
          <main className={`flex-grow ${inter.className}`}>
            <Component {...pageProps} />
          </main>
          {!noNavbarFooter.includes(router.pathname) && <Footer />}
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}
