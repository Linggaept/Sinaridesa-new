import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import Image from "next/image";
import NeedUs from "../needUs";

const navItem: Array<{ label: string; href: string }> = [
  {
    label: "Home",
    href: "/#home",
  },
  {
    label: "Visi & Misi",
    href: "/#visi-misi",
  },
  {
    label: "Produk",
    href: "/#produk",
  },
  {
    label: "Ai Sinari Desa",
    href: "/#SmartAi",
  },
  {
    label: "Blockchain",
    href: "/#Blockchain",
  },
  {
    label: "Courses",
    href: "/#Courses",
  },
  {
    label: "Support",
    href: "/#Support",
  },
  {
    label: "Mentor",
    href: "/#Mentor",
  },
  {
    label: "Contact Us",
    href: "/#ContactUs",
  },
];

export default function Component() {
  return (
    <>
      <div className="bg-green-700 w-full h-16">
        <header className="fixed z-50 flex h-16 w-full shrink-0 items-center px-4 md:px-6 bg-linear-to-r from-green-900/85 to-green-900/90 backdrop-blur-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link
                href="#"
                className="mr-6 hidden lg:flex pl-4 pt-4"
                prefetch={false}
              >
                <Image
                  src={"/img/logo/logo.png"}
                  alt="Logo"
                  width={60}
                  height={60}
                  className="shadow-md shadow-black/30 bg-black rounded-md"
                />
              </Link>
              <div className="grid gap-2 py-6">
                {navItem.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex w-full items-center px-4 py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <Image
              src={"/img/logo/logo.png"}
              alt="Logo"
              width={40}
              height={40}
              className="shadow-md shadow-black/30 bg-black rounded-md"
            />
          </Link>
          <nav className="ml-auto hidden lg:flex gap-6">
            {navItem.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-green-900 hover:text-whitez disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-gray-100/50 "
                prefetch={false}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
      </div>
      <div className="flex gap-2 fixed z-50 bg-green-800 w-full text-center py-2 mx-auto items-center justify-center">
        <p className="  text-white font-bold md:font-extrabold italic text-xs md:text-sm">
          Ingin Sinari Desa Hadir di Desamu?
        </p>
        <NeedUs />
      </div>
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
