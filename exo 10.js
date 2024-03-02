// 10 - Afficher les titres ainsi que l'année de sortie des films sorties avant l'année 1968 comprise (la même question mais année 1968 non comprise).


// ----------- pour la deuxieme partie de l'exercie on remplacera lte par lt à la ligne 18  $match: {year: { $lt: 1968}}


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
                    $match: {year: { $lte: 1968}}
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