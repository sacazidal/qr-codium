"use client";

import BtnDownload from "@/components/BtnDownload";
import PreviewQR from "@/components/PreviewQR";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { generateQRCode } from "@/lib/generateQR";
import { poppins } from "@/utils/fonts";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [size, setSize] = useState<number>(250);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!text) {
      setQrUrl(null);
      return;
    }

    let isMounted = true;

    const generate = async () => {
      try {
        const qr = await generateQRCode(text, {
          size: size,
        });

        if (isMounted) {
          setQrUrl(qr);
        }
      } catch (error) {
        console.error(error);
      }
    };

    generate();
    return () => {
      isMounted = false;
    };
  }, [text, size]);

  const handleDownload = () => {
    if (!qrUrl) return;

    const blob = new Blob([qrUrl], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-4 md:gap-6">
      <h2
        className={`${poppins.className} text-base md:text-2xl font-semibold text-center`}
      >
        Генератор QR-кодов
      </h2>
      <p className="text-[10px] md:text-sm text-muted-foreground text-center max-w-md">
        Введите текст, ссылку или любой другой контент для генерации QR-кода.
      </p>

      {/* Форма ввода */}
      <div className="w-full space-y-4">
        {/* Поле ввода текста */}
        <div className="space-y-2">
          <Label htmlFor="input-text" className="text-[12px] md:text-base">
            Введите текст или ссылку
          </Label>
          <Input
            id="input-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com "
            className="h-7 md:h-9 w-full bg-neutral-700 border-neutral-600 text-white text-[12px] md:text-base placeholder:text-neutral-400 md:placeholder:text-base placeholder:text-[12px]"
          />
        </div>

        {/* Размер */}
        <div className="space-y-2">
          <Label className="text-[12px] md:text-base">Размер QR-кода</Label>
          <div className="flex flex-col gap-2">
            <Slider
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
              min={50}
              max={450}
              step={5}
              className="w-full h-2 rounded-full bg-neutral-600 [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-neutral-900"
            />
            <p className="text-center text-[12px] md:text-sm text-neutral-300">
              {size}px
            </p>
          </div>
        </div>
      </div>

      {/* Превью QR кода */}
      <PreviewQR qrUrl={qrUrl} />

      {/* Кнопка скачивания */}
      {qrUrl && <BtnDownload onClick={handleDownload} disabled={qrUrl} />}
    </div>
  );
}
