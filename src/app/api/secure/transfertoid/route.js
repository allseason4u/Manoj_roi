import { queryDB } from "@/lib/db";
import { decryptStringAES, encryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  const auth = req.headers.get("authorization") || "";
  const form = JSON.parse(decryptStringAES(auth));
  const body = await req.formData();
  const formdata = JSON.parse(decryptStringAES(body.get("data")));
  const data = await queryDB("transfertoid", {
    memberid: form.memberid,
    tranferamt: formdata.trtranferamt,
    tranferid: formdata.tranferid,
  });
  return NextResponse.json(encryptData(JSON.stringify(data[0])));
}
