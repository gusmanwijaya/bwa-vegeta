import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { ProductCategory } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const take = 9;
    const query = req.nextUrl.searchParams;
    const page = query.get("page")
      ? parseInt(query.get("page") as string) - 1
      : 0;
    const categories = query.get("category")?.split(",") || undefined;
    const minPrice = query.get("min_price")
      ? parseInt(query.get("min_price") as string)
      : undefined;
    const maxPrice = query.get("max_price")
      ? parseInt(query.get("max_price") as string)
      : undefined;
    const ratings =
      query
        .get("rating")
        ?.split(",")
        ?.map((value) => +value) || undefined;
    const skip = page * take;

    const queryCondition = {
      AND: [
        {
          category: {
            in: categories as ProductCategory[],
          },
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
          rating: {
            in: ratings,
          },
        },
      ],
    };

    const totalProducts = await prisma.product.count({
      where: queryCondition,
    });
    const products = await prisma.product.findMany({
      take,
      skip,
      where: queryCondition,
    });

    return Response({
      status: 200,
      message: "Success to get products",
      data: {
        page,
        take,
        skip,
        totalProducts,
        products,
      },
    });
  } catch (error) {
    return Response({
      status: 500,
      message: "Failed to get products",
      data: error,
    });
  }
};
