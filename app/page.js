"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate user authentication status check.
    // In a real application, replace this with your actual authentication check.
    const isLoggedIn = false; 

    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">User is logged in.</strong>
      </div>
    </div>
  );
}
