import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'SingOut successful' }, { status: 200 })

  response.cookies.delete('token');

  return response;
}
