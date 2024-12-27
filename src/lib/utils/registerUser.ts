import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function registerUser(email: string, password: string) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("409: Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    return newUser;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("409")) {
      throw { status: 409, message: "Email already exists" };
    }
    console.error("Registration error:", error);
    throw { status: 500, message: "Internal server error" };
  }
}
