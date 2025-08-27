"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import Image from "next/image";

export default function NeedUs() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold"
        >
          <QrCode className="mr-2 h-5 w-5" />
          Info SinariDesa
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 bg-green-600 border-none rounded-lg">
        <div className="bg-green-600 text-white p-8 text-center space-y-6 rounded-lg">
          {/* Header Text */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold leading-tight">
              Ingin SinariDesa
            </h2>
            <h2 className="text-3xl font-bold leading-tight">
              hadir di desamu?
            </h2>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-6 rounded-lg mx-auto w-fit">
            <Image
              src="/img/qr-code.png"
              alt="QR Code SinariDesa"
              width={192}
              height={192}
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* URL Button */}
          <div className="bg-green-800 rounded-full px-6 py-3 mx-auto w-fit">
            <a
              href="https://s.id/InfoSinariDesa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold text-lg hover:underline"
            >
              s.id/InfoSinariDesa
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
