import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, params: Params) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params?.params?.id,
    },
  });

  return Response({
    status: 200,
    message: `Success to get product by id : ${params?.params?.id}`,
    data: product,
  });
};
