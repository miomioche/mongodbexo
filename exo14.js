// 14 : Afficher le nombre de films par genre.
const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);
    const db = client.db();
    try {
        await client.connect();
        console.log("connected to server")
        const result = await db.collection("films").aggregate(
            [
            {
                $group: {
                    _id: "$genre",
                    count: {$sum: 1}
                }
            }

        ]
        ).toArray();
        console.log(result);
        
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
main()
