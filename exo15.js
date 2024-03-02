// 15 – Compter le nombre de documents qui composent cette collection et pour lesquels l’année de sortie du film est supérieure ou égale à l’année 2000. 


const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);
    const db = client.db();
    try {
        await client.connect();
        console.log("connected to server")
        const result = await db.collection("films").countDocuments({
            year: {
                $gte: 2000
            }
            
        }
        
        )
        console.log("il y a "+result+" documents pour cette collection");
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
main()
