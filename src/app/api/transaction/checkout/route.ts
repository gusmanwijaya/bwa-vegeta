import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    const payload = await req.json();
    const product = await prisma.product.findFirst({
      where: {
        id: payload?.product_id,
      },
    });

    if (!product)
      return Response({
        status: 404,
        message: "Product not found",
      });

    const checkout = await prisma.checkout.create({
      data: {
        userId: session?.user?.id,
        productId: product?.id,
        qty: payload?.qty,
        pricePerItem: product?.price,
      },
    });

    return Response({
      status: 201,
      message: "Success to checkout",
      data: checkout,
    });
  } catch (error) {
    return Response({
      status: 500,
      message: "Failed to checkout",
      data: error,
    });
  }
};

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    const checkout = await prisma.checkout.findMany({
      where: {
        userId: session?.user?.id,
        transactionId: {
          equals: null,
        },
      },
      include: {
        product: true,
      },
    });

    return Response({
      status: 200,
      message: "Success to get checkout",
      data: checkout,
    });
  } catch (error) {
    return Response({
      status: 500,
      message: "Failed to get checkout",
      data: error,
    });
  }
};
