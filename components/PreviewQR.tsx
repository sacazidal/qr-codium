"use client";

const PreviewQR = ({ qrUrl }: { qrUrl: string | null }) => {
  return (
    <div className="mt-2 md:mt-6 w-full flex justify-center">
      {qrUrl ? (
        <div
          className="border border-neutral-600 p-4 rounded-lg bg-neutral-900 shadow-lg"
          dangerouslySetInnerHTML={{ __html: qrUrl }}
        />
      ) : (
        <p className="text-[12px] md:text-sm text-neutral-400">
          Введите данные для генерации QR
        </p>
      )}
    </div>
  );
};
export default PreviewQR;
