"use client";

import { useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/stores/profileStore';

export default function Home() {
  const router = useRouter();
  const { basicInfo } = useProfileStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (basicInfo.name) {
        router.push('/profile');
      } else {
        router.push('/basic-info');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [basicInfo.name, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/logo.svg" alt="logo" width={184} height={184} />
    </div>
  );
}
