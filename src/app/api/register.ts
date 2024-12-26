import { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "../../lib/utils/registerUser"; // Adjust path if needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const newUser = await registerUser(email, password);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
}
