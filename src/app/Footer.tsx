"use client";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { FaBalanceScale } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
  return (
    <>
      <footer className="w-full bg-green-700" id="ContactUs">
        <div className="w-10/12 py-10 px-2 md:p-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto gap-10">
          <div className="flex flex-col">
            <h1 className="text-yellow-500 font-bold text-3xl">Get Contact</h1>

            <div className="flex mt-10">
              <h1 className="text-white font-normal text-sm flex gap-4 items-start">
                <span>
                  <FaLocationDot className="text-yellow-500 w-10 h-10" />
                </span>
                Dusun Malangrejo RT 02 RW 33 Padukuhan Malangrejo , Wedomartani,
                Kec. Ngemplak, Kabupaten Sleman, Daerah Istimewa Yogyakarta
                55584
              </h1>
            </div>
            <div className="flex mt-4">
              <h1 className="text-white font-normal text-sm flex gap-4 items-center">
                <span>
                  <IoMdCall className="text-yellow-500 w-10 h-10" />
                </span>
                +62 857-2663-1291
              </h1>
            </div>
            <div className="flex mt-4 items-center">
              <div className="text-white font-normal text-sm flex gap-4 items-center">
                <span>
                  <FaBalanceScale className="text-yellow-500 w-10 h-10" />
                </span>
                <div className="flex flex-col">
                  <h1>SK. Kemenkumham RI</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="text-yellow-500 font-bold text-3xl mb-10">
              Get in Touch
            </h1>
            <form action="" className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nama"
                className="w-52 md:w-72 rounded-md p-2 text-xs focus:shadow-sm text-black bg-white focus:outline-yellow-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-52 md:w-72 rounded-md p-2 text-xs focus:shadow-sm text-black bg-white focus:outline-yellow-500"
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-52 md:w-72 rounded-md p-2 text-xs focus:shadow-sm text-black bg-white focus:outline-yellow-500"
              />
              <textarea
                name="deskripsi"
                id="deskripsi"
                className="h-20 rounded-md text-xs w-52 md:w-72 p-2 focus:shadow-sm text-black bg-white focus:outline-yellow-500"
                placeholder="Message"
              ></textarea>
              <button
                onClick={(e) => e.preventDefault()}
                className="bg-yellow-500 text-white  p-2 rounded-md w-52 md:w-72 hover:bg-yellow-400 duration-300"
              >
                Send
              </button>
            </form>
          </div>

          <div className="">
            <div className="flex flex-col">
              <h1 className="text-yellow-500 font-bold text-3xl mb-10">
                Find Us
              </h1>
              <div className="flex gap-4">
                <div className="bg-blue-600 rounded-full p-3 cursor-pointer hover:bg-blue-500 duration-300 hover:scale-125">
                  <FaFacebook className="w-6 h-6 text-white" />
                </div>
                <div className="bg-pink-600 rounded-full p-3 cursor-pointer hover:bg-pink-500 duration-300 hover:scale-125">
                  <Link
                    href={"https://www.instagram.com/sinaridesa"}
                    target="_blank"
                  >
                    <FaInstagram className="w-6 h-6 text-white" />
                  </Link>
                </div>
                <div className="bg-blue-400 rounded-full p-3 cursor-pointer hover:bg-blue-300 duration-300 hover:scale-125">
                  <FaTwitter className="w-6 h-6 text-white" />
                </div>
                <div className="bg-red-600 rounded-full p-3 cursor-pointer hover:bg-red-500 duration-300 hover:scale-125">
                  <Link
                    href={"https://youtube.com/@sinaridesa"}
                    target="_blank"
                  >
                    <FaYoutube className="w-6 h-6 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
