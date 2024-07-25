'use client'

import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 h-full justify-center items-center">
        <Image src={'/logo.png'} width={450} height={450} alt="logo"/>
        <Button variant={'outline'} onClick={() => router.push('/login1')}>Iniciar Sesión</Button>
      </div>
      <div className="flex flex-col justify-end h-1/10">
        <Footer />
      </div>
    </div>
  );
}
