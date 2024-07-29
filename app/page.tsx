'use client'

import Logo from "@/components/misc/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter()
  
  const onClick = () => {
    router.push('/login1')
  }

  return (
    <div className="w-full h-screen flex bg-sky-50">
      <div style={{
        borderRadius: '0 99% 99% 0',
      }} className="w-full h-full bg-clouds bg-cover relative">
        <motion.div key="plane"
        initial={{ x: -650, y:650 }}
        transition={{
          delay: 0.5,
          duration: 1,
          bounce: 0.40,  
          type: "spring"
        }}
        
        animate={{ x: 0, y: 0 }}
        whileHover={{ scale: 1.1 }}
        exit={{ opacity: 0 }}>
          <Image className="absolute top-56 -right-40" src={'/plane3.png'} width={850} height={850} alt="avion" />
        </motion.div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <motion.div initial={{opacity: 0}} animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} className="flex flex-col gap-2 justify-center items-center gap-4">
          <Logo />
          <Button onClick={onClick}>Iniciar Sesión</Button>
        </motion.div>
      </div>
    </div>
  );
}
