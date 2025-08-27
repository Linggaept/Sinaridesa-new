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
                Jl. Anyelir 2 No. 278, Perumnas Condong Catur, Condongcatur,
                Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55584
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.08247561937605!2d110.40867776331855!3d-7.755886818157457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599c2f2c63f1%3A0xce1a3e496ab94d2b!2sJl.%20Anyelir%202%20No.278%2C%20Perumnas%20Condong%20Catur%2C%20Condongcatur%2C%20Kec.%20Depok%2C%20Kabupaten%20Sleman%2C%20Daerah%20Istimewa%20Yogyakarta%2055281!5e0!3m2!1sid!2sid!4v1756273500523!5m2!1sid!2sid"
                width="420"
                height="220"
                className="mb-4 rounded-2xl w-11/12 md:w-full"
              ></iframe>
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
