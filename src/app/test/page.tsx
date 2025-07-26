"use client";

import Hobbies from "@/components/hobbies";
import { AdvancedInput } from "@/components/ui/advanced-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/stores/profileStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNavigation from "@/components/BottomNavigation";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function TestPage() {
  const { basicInfo, aboutYou, tellYou, resetProfile } = useProfileStore();
  const router = useRouter();

  return (
    <>
      
    </>

  );
}
