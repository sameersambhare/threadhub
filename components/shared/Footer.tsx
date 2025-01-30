"use client"
import { sidebarLinks } from "@/constants"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
const Footer = () => {
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {
          sidebarLinks.map((link) => {
            const pathname = usePathname()
            const router = useRouter()
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
            return (
              <Link href={link.route} key={link.label} className={`bottombar_link ${isActive && 'bg-primary-500'}`}>
                <Image src={link.imgURL} alt={link.label} width={24} height={24}></Image>
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}

export default Footer