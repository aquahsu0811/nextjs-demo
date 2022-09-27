import Head from 'next/head';
import {MongoClient, ObjectId } from 'mongodb'

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props){
  return(
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail 
        image= {props.meetupData.image}
        title= {props.meetupData.title}
        address= {props.meetupData.address}
        description= {props.meetupData.description}
      />
    </>
  )
};

export async function getStaticPaths(){

  let client;
  try {
    client = await MongoClient.connect(
      'mongodb+srv://AquaAdmin:dUYonbpI2yOr2CjW@cluster0.6i4zscc.mongodb.net/meetups?retryWrites=true&w=majority'
    );
  } catch (error){
    
    console.log(error);
    return;
  }

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

  console.log("result", meetups);

  client.close();

  return{
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  }
};

export async function getStaticProps(context){
  const meetupId = context.params.meetupId;

  let client;
  try {
    client = await MongoClient.connect(
      'mongodb+srv://AquaAdmin:dUYonbpI2yOr2CjW@cluster0.6i4zscc.mongodb.net/meetups?retryWrites=true&w=majority'
    );
  } catch (error){
    
    console.log(error);
    return;
  }

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return{
    props:{
      meetupData:{
        image: selectedMeetup.data.image,
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        description: selectedMeetup.data.description
      }
    }
  }
}

export default MeetupDetails;

