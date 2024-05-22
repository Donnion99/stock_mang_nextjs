import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Connection URI
  const uri = "mongodb+srv://kunal:kunal2005@practice.ljuxe2c.mongodb.net";
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    const database = client.db("dony_stocks");
    const stocks = database.collection("stock");

    const Products = await stocks.find().toArray();
    // console.log(result);
    // console.log("Connected successfully to server");
    return NextResponse.json({ success: true, Products });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function POST(request) {
  const body = await request.json();

  // Connection URI
  const uri = "mongodb+srv://kunal:kunal2005@practice.ljuxe2c.mongodb.net";
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    const database = client.db("dony_stocks");
    const stocks = database.collection("stock");

    const product = await stocks.insertOne(body);
    // console.log(product);
    // console.log("Connected successfully to server");
    return NextResponse.json({ product, ok: true });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
