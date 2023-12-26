import { NextResponse } from "next/server";

interface ApiResponse {
  status?: ResponseInit["status"];
  message?: string;
  data?: any;
}

const Response = ({ status = 500, message = "", data }: ApiResponse) =>
  NextResponse.json(
    {
      status,
      message,
      data,
    },
    {
      status,
    }
  );

export default Response;
