// 13 - Afficher tous les titres de film dont le réalisateur n'est pas "Tarantino"

const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);
    const db = client.db();
    try {
        await client.connect();
        console.log("connected to server")
        const result = await db.collection("films").find({
            "director.last_name": { $not: { $eq: "Tarantino" } }
        },
            { projection: { _id: 0, title: 1, "director.last_name": 1 } })
            .toArray();
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
