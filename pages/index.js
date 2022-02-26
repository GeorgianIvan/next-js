import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge stuff!"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// executed during the build process
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://GeorgianIvan:ekk4vfLSoVFm6ra9@cluster0.hht1e.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
