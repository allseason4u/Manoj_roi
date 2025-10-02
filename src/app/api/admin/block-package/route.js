import { queryDB } from "@/lib/db";
import { encryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";
import { getAuthAdmin } from "@/utils/getAuthAdmin";
import { getRequestBody } from "@/utils/getRequestBody";

export async function POST(req) {
  try {
    const adminid = await getAuthAdmin();
      const body = await getRequestBody(req);
    const memberid = body.memberid;
    const plan = body.plan;
    const packageId = body.packageId;

    console.log;

    const dataRaw = await queryDB(
      "EXEC [dbo].[admin_blockPackage] @memberid = @memberid, @plan = @plan, @packageId = @packageId",
      { memberid, plan, packageId }
    );

    return NextResponse.json(encryptData(JSON.stringify(dataRaw)));
  } catch (e) {
    console.error("API Error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
