// 11 - La même question que la précédente mais en triant la sortie par années croissantes, par années décroissantes. Enfin, vous n'afficherez cette fois que 5 lignes 
// 10 - Afficher les titres ainsi que l'année de sortie des films sorties avant l'année 1968 comprise (la même question mais année 1968 non comprise).


// ----------- pour la deuxieme partie de l'exercie on remplacera sort year:1 par -1 à la ligne 25  .sort({ year: -1, })


const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    const db = client.db();
    try {
        await client.connect();
        console.log("connected to server")

        const result = await db.collection("films").find(
            {
                year: { $lte: 1968 }
            },
            { projection: { "title": 1, _id: false, year: 1 } }
            )
            .limit(5)
            .sort({ year: 1, })
            
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
