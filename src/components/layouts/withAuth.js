import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/features/auth/AuthContext";

export function withAuth(WrappedComponent, requiredRole = null) {
  return function WithAuth(props) {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn, checkAuthStatus, userData } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        await checkAuthStatus();
        setIsLoading(false);
      };
      checkAuth();
    }, []);

    useEffect(() => {
      if (!isLoading) {
        if (!isLoggedIn) {
          router.push("/auth/login");
        } else if (requiredRole && userData?.role !== requiredRole) {
          router.push("/exceptions/unauthorized");
        }
      }
    }, [isLoading, isLoggedIn, router, userData, requiredRole]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isLoggedIn || (requiredRole && userData?.role !== requiredRole)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
