import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password))
      return Response({
        status: 404,
        message: "Invalid credentials",
      });

    const data: Partial<User> = {
      ...user,
      password: undefined,
    };

    return Response({
      status: 201,
      message: "Success to Sign In",
      data,
    });
  } catch (error: any) {
    return Response({
      status: 500,
      message: "Failed to Sign In",
      data: error,
    });
  }
};
