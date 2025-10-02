import { queryDB } from "@/lib/db";
import { encryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";
import { getAuthAdmin } from "@/utils/getAuthAdmin";

export async function POST() {
  try {
    const adminid = await getAuthAdmin(); // authenticate admin

    const dataRaw = await queryDB("EXEC [dbo].[admin_GetTurbo8List]");

    let data = [];
    if (dataRaw.length > 0 && dataRaw[0][""]) {
      data = JSON.parse(dataRaw[0][""]);
    } else {
      data = dataRaw; 
    }

    if (!data || !data.length) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(encryptData(JSON.stringify(data)));
  } catch (e) {
    console.error("API Error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
