import Response from "@/lib/api.response";

export const GET = async () =>
  Response({
    status: 200,
    message: "Get all users",
    data: [
      {
        id: 1,
        name: "Gusman",
      },
      {
        id: 2,
        name: "Wijaya",
      },
    ],
  });

export const POST = async () =>
  Response({
    status: 201,
    message: "Create user success",
  });
