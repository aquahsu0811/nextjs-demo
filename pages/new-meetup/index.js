import { Fragment } from 'react';
import { useRouter } from 'next/router.js';

import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';

function NEwMeetupPage(){

  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData){

    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
    
    router.push('/');
  };

  return (
    <Fragment>
      <Head>
          <title>Add New Meetup</title>
          <meta name="description" content="Add new meetup." />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  )
}

export default NEwMeetupPage;
