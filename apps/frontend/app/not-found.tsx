"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-base text-muted-foreground">{`:(`}</p>
        <h1 className="text-6xl font-bold text-primary tracking-tight">404</h1>
        <Link href="/">
          <Button size="lg" variant="outline" className="cursor-pointer">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
