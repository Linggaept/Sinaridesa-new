"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ClipboardCheck, MapPin, Users, GraduationCap, HeartHandshake, HandHeart, Instagram, ArrowRight } from 'lucide-react';

const SinardesaImpact = () => {
  const [countsStarted, setCountsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countsStarted) {
            setCountsStarted(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    const currentRef = statsRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [countsStarted]);

  return (
    <>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delayed {
          opacity: 0;
          animation: fade-in 0.8s ease-out 0.8s forwards;
        }
      `}</style>

      <div className="bg-gray-50 text-gray-800 antialiased min-h-screen">
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          {/* Background Elements */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none" 
            style={{
              backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" />
          <div 
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" 
            style={{ animationDelay: '2s' }}
          />

          <div className="container mx-auto px-6 relative z-10">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wider uppercase mb-4 border border-emerald-100">
                Jejak Langkah Kami
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Dampak Nyata dari <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-emerald-600">Desa untuk Dunia</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
                Setiap angka mewakili cerita perubahan. Bersama Sinaridesa, kami terus bergerak memberdayakan masyarakat melalui teknologi dan kolaborasi.
              </p>
            </div>

            {/* Grid Stats */}
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <StatCard
                icon={ClipboardCheck}
                target={22}
                label="Program Terlaksana"
                color="amber"
                delay="100ms"
                countsStarted={countsStarted}
              />
              <StatCard
                icon={MapPin}
                target={8}
                label="Desa Terdampak"
                color="emerald"
                delay="200ms"
                countsStarted={countsStarted}
              />
              <StatCard
                icon={Users}
                target={450}
                label="Partisipan Pemuda"
                color="blue"
                delay="300ms"
                countsStarted={countsStarted}
              />
              <StatCard
                icon={GraduationCap}
                target={26}
                label="Partisipan Guru"
                color="purple"
                delay="400ms"
                countsStarted={countsStarted}
              />
              <StatCard
                icon={HeartHandshake}
                target={110}
                label="Partisipan Orang Tua"
                color="rose"
                delay="500ms"
                countsStarted={countsStarted}
              />
              <StatCard
                icon={HandHeart}
                target={35}
                label="Partisipan Relawan"
                color="orange"
                delay="500ms"
                countsStarted={countsStarted}
              />
            </div>

            {/* Call to Action */}
            <div className="mt-20 text-center animate-fade-in-delayed">
              <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-white p-2 pr-2 md:pr-8 rounded-full border border-gray-100 shadow-xl shadow-gray-200">
                <span className="bg-gray-100 text-gray-600 py-2 px-6 rounded-full text-sm font-semibold">Tertarik Berkolaborasi?</span>
                <p className="text-gray-600 text-sm hidden md:block">Ikuti perjalanan kami selengkapnya</p>
                <a 
                  href="https://instagram.com/sinaridesa" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-emerald-600 font-bold hover:text-emerald-800 transition-colors"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  @sinaridesa
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

type ColorType = 'amber' | 'emerald' | 'blue' | 'purple' | 'rose' | 'orange';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  target: number;
  label: string;
  color: ColorType;
  delay: string;
  countsStarted: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, target, label, color, delay, countsStarted }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!countsStarted) return;

    const speed = 150;
    const increment = target / speed;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [countsStarted, target]);

  const colorClasses: Record<ColorType, { bg: string; gradient: string; text: string; shadow: string }> = {
    amber: {
      bg: 'bg-amber-50 group-hover:bg-amber-100',
      gradient: 'bg-gradient-to-br from-amber-400 to-amber-600',
      text: 'text-amber-500',
      shadow: 'hover:shadow-amber-100/50'
    },
    emerald: {
      bg: 'bg-emerald-50 group-hover:bg-emerald-100',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-900',
      text: 'text-emerald-500',
      shadow: 'hover:shadow-emerald-100/50'
    },
    blue: {
      bg: 'bg-blue-50 group-hover:bg-blue-100',
      gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
      text: 'text-blue-500',
      shadow: 'hover:shadow-blue-100/50'
    },
    purple: {
      bg: 'bg-purple-50 group-hover:bg-purple-100',
      gradient: 'bg-gradient-to-br from-purple-400 to-purple-600',
      text: 'text-purple-500',
      shadow: 'hover:shadow-purple-100/50'
    },
    rose: {
      bg: 'bg-rose-50 group-hover:bg-rose-100',
      gradient: 'bg-gradient-to-br from-rose-400 to-rose-600',
      text: 'text-rose-500',
      shadow: 'hover:shadow-rose-100/50'
    },
    orange: {
      bg: 'bg-orange-50 group-hover:bg-orange-100',
      gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
      text: 'text-orange-500',
      shadow: 'hover:shadow-orange-100/50'
    }
  };

  const colors = colorClasses[color];

  return (
    <div 
      className={`group relative bg-white rounded-3xl p-8 shadow-lg shadow-gray-100 hover:shadow-2xl ${colors.shadow} transition-all duration-300 border border-gray-100 hover:-translate-y-2 opacity-0 animate-fade-in`}
      style={{ animationDelay: delay }}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bg} rounded-bl-full -mr-4 -mt-4 transition-all`} />
      <div className="relative">
        <div className={`w-14 h-14 ${colors.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-2 tracking-tight">
          <span>{count}</span>
          <span className={`${colors.text} text-4xl`}>+</span>
        </h3>
        <p className="text-gray-500 font-medium text-lg">{label}</p>
      </div>
    </div>
  );
};

export default SinardesaImpact;