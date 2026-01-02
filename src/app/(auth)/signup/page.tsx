"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login since we're using hardcoded auth
    router.push("/login");
  }, [router]);

  return null;
}
