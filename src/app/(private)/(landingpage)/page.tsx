"use client"
import {AUTH_ROUTES, SIDEBAR_ROUTES} from "@/routes";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(SIDEBAR_ROUTES.users.path); // Redirige vers /app
  }, [router]);

  return null; // La page racine ne contient rien, car elle redirige immédiatement

}

export default Page;