import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    const data: Prisma.UserCreateInput = {
      name,
      email,
      password: bcrypt.hashSync(password, 12),
    };

    const user = await prisma.user.create({
      data,
    });

    const response: Partial<User> = {
      ...user,
      password: undefined,
    };

    return Response({
      status: 201,
      message: "Success to Sign Up",
      data: response,
    });
  } catch (error) {
    return Response({
      status: 500,
      message: "Failed to Sign Up",
      data: error,
    });
  }
};
