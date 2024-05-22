import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { slug, action, initialquantity } = await request.json();
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
    const quantity =
      action == "plus"
        ? parseInt(initialquantity) + 1
        : parseInt(initialquantity) - 1;

    try {
      const result = await stocks.updateOne(
        { slug: slug },
        { $set: { quantity: quantity } }
      );
      return NextResponse.json({ ok: true, result });
    } catch (e) {
      return NextResponse.json({ ok: false, e });
    }

    // console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
