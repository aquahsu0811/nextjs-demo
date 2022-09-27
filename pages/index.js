import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

// const DUMMPY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image: 'https://www.bring-you.info/wp-content/uploads/2019/01/kiyomizudera-night-maple-4.jpg',
//     address: 'Chome-294 Kiyomizu, Higashiyama Ward, Kyoto',
//     description: 'kiyomizudera'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image: 'https://www.bring-you.info/wp-content/uploads/2019/01/kiyomizudera-night-maple-4.jpg',
//     address: 'Chome-294 Kiyomizu, Higashiyama Ward, Kyoto',
//     description: 'kiyomizudera'
//   }

// ];

function HomePage(props){

  return (
      <Fragment>
        <Head>
          <title>Meetups</title>
          <meta name="description" content="Browse a list of highly active React meetups!" />
        </Head>
        <MeetupList meetups={props.meetups} />
      </Fragment>
  );
}

// export async function getServerSideProps(context){

//   const req = context.req;
//   const res = context.res;
//   console.log(req);

//   return{
//     props:{
//       meetups: DUMMPY_MEETUPS
//     }
//   }
// }

export async function getStaticProps(){
  let client;
  try {
    client = await MongoClient.connect('mongodb+srv://AquaAdmin:dUYonbpI2yOr2CjW@cluster0.6i4zscc.mongodb.net/meetups?retryWrites=true&w=majority');
  } catch (error){
    console.log(error);
    return;
  }
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);
  client.close();

  return{
    props:{
      meetups: meetups.map((meetup) =>({
        id: meetup._id.toString(),
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        
      }))
    },
    // value is seconde , it will regenerated page on the server 
    revalidate: 10
  }
}

export default HomePage;