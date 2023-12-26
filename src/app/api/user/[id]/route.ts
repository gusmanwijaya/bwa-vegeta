import Response from "@/lib/api.response";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
  const queryParams = req.nextUrl.searchParams.get("qp");
  const pathVariables = params.id;

  return Response({
    status: 200,
    message: `Get user by id : ${pathVariables}`,
    data: {
      queryParams,
    },
  });
};
