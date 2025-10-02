import { queryDB } from "@/lib/db";
import { encryptData } from "@/utils/cryptoUtils";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";
import { getRequestBody } from "@/utils/getRequestBody";

export async function POST(req) {
  try {
    const memberid = await getAuthUser();

    const body = await getRequestBody(req);

    const lno = body.lno;

    const dataRaw = await queryDB(
      "EXEC [dbo].[levels] @memberid = @memberid,@lno = @lno",
      { memberid, lno }
    );
    console.log(dataRaw);

    let data = [];
    if (dataRaw.length > 0 && dataRaw[0]["data"]) {
      data = JSON.parse(dataRaw[0]["data"]);
    }
    console.log(data);

    return NextResponse.json(encryptData(JSON.stringify(data)));
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
