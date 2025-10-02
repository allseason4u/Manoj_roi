import { NextResponse } from "next/server";
import { queryDB } from "@/lib/db";
import { ethers } from "ethers";
import { encryptData, decryptData } from "@/utils/cryptoUtils";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const encryptedData = formData.get("data");
    const input = JSON.parse(decryptData(encryptedData));
    const { referralId, name, mobile, email, password } = input;

    // Generate wallet
    const wallet = ethers.Wallet.createRandom();
    const acadr = wallet.address;
    const ackeyenc = encryptData(wallet.privateKey);
    const acwordsenc = encryptData(wallet.mnemonic.phrase);

    // Call SQL procedure
    const result = await queryDB(
      "EXEC [dbo].[green_makegreen] @introid=@refid,@name=@name,@mobile=@mobile,@email=@email,@password=@password, @acadr=@acadr, @ackey=@ackeyenc, @acwords=@acwordsenc",
      {
        refid: referralId,
        name: name,
        mobile: mobile,
        email: email,
        password: password,
        acadr,
        ackeyenc,
        acwordsenc,
      }
    );

    let finalResult;
    if (result && result.length > 0) {
      // Directly take the first row from SQL result
      finalResult = result[0];
    } else {
      finalResult = { result: "Unexpected DB response" };
    }

    const responseEncrypted = encryptData(JSON.stringify(finalResult));
    return NextResponse.json(responseEncrypted);
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
