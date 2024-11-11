"use client"
import {useRouter} from "next/navigation";
import {useEffect} from "react";

function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/app"); // Redirige vers /app
  }, [router]);

  return null; // La page racine ne contient rien, car elle redirige immédiatement

}

export default Page;