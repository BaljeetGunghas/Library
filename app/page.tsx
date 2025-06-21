'use client';
import Home from "@/Components/Home/Home";
import 'aos/dist/aos.css';
import Aos from 'aos'
import { useEffect } from "react";
const Page = () => {

  useEffect(() => {
    const initAOS = async () => {
      Aos.init({
        duration: 1000,
        easing: 'ease',
        once: true,
        anchorPlacement: 'top-bottom'
      })
    }

    initAOS()
  }, [])
  return (
    <div className="">
      <Home />
    </div>
  )
}
export default Page 
