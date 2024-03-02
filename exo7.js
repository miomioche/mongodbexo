// 7 - Quel est le réalisateur du film "Memento".

const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")

        const result = await db.collection("films").find(
            {
                "title": "Memento"
            },
            {projection : { "title":1, _id: false, "director": 1}

            }
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