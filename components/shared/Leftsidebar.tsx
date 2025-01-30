import Link from "next/link"
import Image from "next/image"
import { sidebarLinks } from '@/constants'
const Leftsidebar = () => {
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => (
          <Link href={link.route} key={link.label} className="leftsidebar_link">
            <Image src={link.imgURL} alt={link.label} width={24} height={24}></Image>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Leftsidebar