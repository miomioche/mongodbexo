// 9 - Afficher les titres des films sorties entre 1968 et 1978 inclus.

// Afficher tous les titres des films du genre "Action".

const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")

        const result = await db.collection("films").aggregate(
            [
                {
                    $match: {year: { $gte: 1968, $lte: 1978 }}
                },
                {
                    $project:{
                        _id: 0,
                        title: 1,
                        year: 1,
                    }
                },
                {
                    $sort: {
                        year: 1
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