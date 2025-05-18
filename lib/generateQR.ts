import QRCode from "qrcode";

export async function generateQRCode(
  text: string,
  options: {
    size: number;
  } = {
    size: 300,
  }
): Promise<string> {
  if (!text) throw new Error("Текст не может быть пустым");

  return await QRCode.toString(text, {
    type: "svg",
    width: options.size,
    margin: 1,
  });
}
