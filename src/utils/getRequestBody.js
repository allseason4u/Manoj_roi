import { decryptData } from "@/utils/cryptoUtils";

export async function getRequestBody(req) {
  try {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);
    const encryptedData = params.get("data");

    if (!encryptedData) return {};

    const decrypted = decryptData(encryptedData);
    return JSON.parse(decrypted || "{}");
  } catch (error) {
    console.error("Failed to parse request body:", error.message);
    return {};
  }
}
