import { getProductBySlug } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json(
        {
          message: "Slig is not provided",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Success",
        data: product,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", data: null }, { status: 500 });
  }
};
