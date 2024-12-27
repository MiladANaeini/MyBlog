import { NextResponse } from "next/server";
import { registerUser } from "../../../lib/utils/registerUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const newUser = await registerUser(email, password);
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
