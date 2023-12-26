import { PrismaClient } from "@prisma/client";
import ProductsSeeder from "./product.seed";

const prisma = new PrismaClient();

const main = async () => {
  await ProductsSeeder();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log("🚀 ~ file: index.ts:13 ~ main ~ error:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
