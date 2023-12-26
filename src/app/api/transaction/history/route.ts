import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    const take = 9;
    const query = req.nextUrl.searchParams;
    const page = query.get("page")
      ? parseInt(query.get("page") as string) - 1
      : 0;
    const skip = page * take;

    const totalTransactions = await prisma.transaction.count({
      where: {
        userId: session?.user?.id,
      },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: session?.user?.id,
      },
      take,
      skip,
      include: {
        Checkout: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response({
      status: 200,
      message: "Success to get all history",
      data: {
        totalTransactions,
        transactions,
      },
    });
  } catch (error) {
    return Response({
      status: 500,
      message: "Failed to get all history",
      data: error,
    });
  }
};
