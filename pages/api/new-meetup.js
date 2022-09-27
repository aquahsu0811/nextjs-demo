import {MongoClient} from 'mongodb'
// /api/new-meetup
// npm install mongodb
async function handler(req, res){
  if(req.method === 'POST'){
    const data = req.body;
    //const {title, image, address, description} = data;
    let client;
    try {
      client = await MongoClient.connect('mongodb+srv://AquaAdmin:dUYonbpI2yOr2CjW@cluster0.6i4zscc.mongodb.net/meetups?retryWrites=true&w=majority');
    } catch (error){
      
      console.log(error);
      return;
    }
  
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne({ data });

    console.log("result", result);

    client.close();
    res.status(201).json({message: 'Meetup inserted!'});
  }
}

export default handler;