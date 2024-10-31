import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

const DATABASE_NAME = process.env.MONGODB_NAME || "game-consign";
const COLLECTION_NAME = "Products";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getFeaturedProducts = async () => {
  const db = await getDb();

  const products = (await db.collection(COLLECTION_NAME).find({}).limit(6).toArray()) as ProductModel[];

  return products;
};

type GetProductResponse = {
  products: ProductModel[];
  totalProducts: number;
};

export const getProducts = async (query: Record<string, unknown>, skip: number, limit: number) => {
  const db = await getDb();

  const products = (await db.collection(COLLECTION_NAME).find(query).skip(skip).limit(limit).toArray()) as ProductModel[];

  const totalProducts = await db.collection(COLLECTION_NAME).countDocuments(query);

  const result: GetProductResponse = {
    products,
    totalProducts,
  };

  return result;
};

export const getProductBySlug = async (slug: string) => {
  const db = await getDb();

  const product = await db.collection(COLLECTION_NAME).findOne({
    slug: slug,
  });

  return product;
};
