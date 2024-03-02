// 12 - Afficher tous les titres de films du genre "Action" ou "Aventure" ordonnés par genre
const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")

        const result = await db.collection("films").find({
            $or: [
                { genre: 'Action'},
                { genre: 'Aventure'}
            ]
        },
        { projection: {title: 1, _id : 0,genre: 1},
        sort: { genre: 1}})

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
