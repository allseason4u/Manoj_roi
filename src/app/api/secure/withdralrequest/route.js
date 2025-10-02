import { queryDB } from "@/lib/db";
import { decryptStringAES, encryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  const auth = req.headers.get("authorization") || "";
  const form = JSON.parse(decryptStringAES(auth));
  const body = await req.formData();
  const formdata = JSON.parse(decryptStringAES(body.get("data")));
  const data = await queryDB("withdralrequest", {
    memberid: form.memberid,
    amt: formdata.withdrawalamt,
  });
  return NextResponse.json(encryptData(JSON.stringify(data[0])));
}
