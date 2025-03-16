import "aos/dist/aos.css";
import Head from "next/head";
import Blockchain from "./components/Home/Blockchain";
import Country3T from "./components/Home/Country3T";
import Definition from "./components/Home/Definition";
import Header from "./components/Home/Header";
import InternetOffline from "./components/Home/InternetOffline";
import LearningBook from "./components/Home/LearningBook";
import Mentor from "./components/Home/Mentor";
import SmartAI from "./components/Home/SmartAI";
import Superiority from "./components/Home/Superiority";
import Support from "./components/Home/Support";
import TabelAi from "./components/Home/TabelAi";
import Traction from "./components/Home/Traction";
import Value from "./components/Home/Value";
import VisiMisi from "./components/Home/VisiMisi";
import Footer from "./Footer";
import Navbar from "./components/partials/Navbar";
import { AiSinari } from "./components/aiSinari";
import BestProgram from "./components/Home/bestProgram";
import Sponsored from "./components/Home/sponsored";
import Testimonial from "./components/Home/testimonial";

export default function Home() {
  return (
    <>
      <Head>
        <title>SinariDesa - Dari Desa Untuk Dunia!</title>
        <meta
          name="description"
          content="SinariDesa adalah platform TIK inovatif yang membantu anak-anak muda di desa mengembangkan keterampilan mereka melalui teknologi seperti blockchain, AI, dan Internet offline."
        />
        <meta
          name="keywords"
          content="sinari desa, sinaridesa, sinardesa, teknologi pendidikan, sinar desa, teknologi, pendidikan, blockchain, internet offline, smart ai, desa modern, desa digital"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph meta tags */}
        <meta
          property="og:title"
          content="SinariDesa - Dari Desa Untuk Dunia!"
        />
        <meta
          property="og:description"
          content="SinariDesa adalah platform TIK inovatif yang membantu anak-anak muda di desa mengembangkan keterampilan mereka melalui teknologi seperti blockchain, AI, dan Internet offline."
        />
        <meta property="og:url" content="https://sinaridesa.com" />
        <meta property="og:image" content="/img/Logo_PNB_Sinaridesa.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SinariDesa" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://sinaridesa.com" />

        {/* Additional SEO optimizations */}
        <meta name="author" content="SinariDesa Team" />

        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
      </Head>

      <main className="w-full">
        {/* Navbar */}
        <Navbar />
        {/* LayAi */}
        <AiSinari />

        <div className="bg-white">
          {/* Header */}
          <Header />

          {/* Value */}
          <Value />

          {/* Definisi Sinari Desa */}
          <Definition />

          {/* Visi dan Misi */}
          <VisiMisi />

          {/* Support */}
          <Support />

          {/* Superiority */}
          <Superiority />

          {/* PowerIoT */}
          <Country3T />

          {/* InternetOffline */}
          <InternetOffline />
          {/* Belajar Cerdas */}
          <SmartAI />

          {/* TabelAi */}
          <TabelAi />

          {/* Blockchain */}
          <Blockchain />

          {/* LearningBook */}
          <LearningBook />

          {/* Traction */}
          <Traction />

          {/* Best Program */}
          <BestProgram />

          {/* Sponsored */}
          <Sponsored />

          {/* Testimonial */}
          <Testimonial />
          {/* Mentor */}
          <Mentor />

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </>
  );
}
