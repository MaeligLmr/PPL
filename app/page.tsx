'use client';

import { usePageTitle } from "@/components/layout/PageTitleContext";
import { useEffect } from "react";

export default function Home() {
 const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('Dernières séances')
  }, [setTitle])
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content area.</p>
    </div>
  );
}
