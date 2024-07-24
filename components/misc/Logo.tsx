"use client";
import { useTheme } from 'next-themes';
import Image from 'next/image';
import logo from '@/public/logo.png';
import logoDark from '@/public/logo-dark.png'

const Logo = () => {
  const {theme} = useTheme();
  return (
    <>
        {
          theme != "dark"  ? <Image src={logo} alt='Logo SIGEAC' width={350} height={450}  /> : <Image src={logoDark} alt='Logo SIGEAC' width={350} height={350} />
        }
    </>
  )
}

export default Logo