"use client";

import { Button } from "./ui/button";

type BtnDownloadProps = {
  onClick: () => void;
  disabled: string;
};

const BtnDownload = ({ onClick, disabled }: BtnDownloadProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={!disabled}
      className="w-full mt-4 bg-white text-neutral-900 hover:bg-gray-200 text-[12px] md:text-base"
    >
      📥 Скачать QR-код
    </Button>
  );
};
export default BtnDownload;
