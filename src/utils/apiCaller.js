import Cookies from "js-cookie";

import { encryptData, decryptData } from "@/utils/cryptoUtils";

export const apiCaller = async (endpoint, params = {}) => {
  try {
    const encrypted = encryptData(JSON.stringify(params));

    const formData = new URLSearchParams();
    formData.append("data", encrypted);

    const auth = Cookies.get("token");

    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: auth || "",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const encryptedResponse = await response.json();
    const decryptedString = decryptData(encryptedResponse);
    const resultData = JSON.parse(decryptedString);

    return { success: true, data: resultData };
  } catch (error) {
    console.error("API Call Error:", error);
    return { success: false, error: error.message || "Unexpected Error" };
  }
};
