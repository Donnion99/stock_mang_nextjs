import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Connection URI
  const uri = "mongodb+srv://kunal:kunal2005@practice.ljuxe2c.mongodb.net";
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    const query = request.nextUrl.searchParams.get("query");
    // console.log(query);
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    const database = client.db("dony_stocks");
    const stocks = database.collection("stock");
    const Products = await stocks
      .aggregate([
        {
          $match: {
            $or: [{ slug: { $regex: query, $options: "i" } }],
          },
        },
      ])
      .toArray();
    // console.log(result);
    // console.log("Connected successfully to server");
    if (query == "") {
      let Products = [];
      return NextResponse.json({ success: false, Products });
    }
    return NextResponse.json({ success: true, Products });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
