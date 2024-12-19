"use client";

import UpdatePortfolioForm from "@/components/updateForm";
import { useAppSelector } from "@/hooks/react-hoot";
import { selectCurrentAuth, selectCurrentUserToken } from "@/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const token = useAppSelector(selectCurrentUserToken);
  const auth = useAppSelector(selectCurrentAuth);

  useEffect(() => {
    if (!auth && !token) {
      router.push("/auth"); // Perform navigation after the render phase
    }
  }, [auth, token, router]); // Dependencies ensure useEffect runs when these values change

  // Render a loading state until the redirection is complete
  if (!auth && !token) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <UpdatePortfolioForm />
    </div>
  );
}
