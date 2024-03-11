// import Itinerary from "../api/schema/Itinerary";
// import connect from "../api/db/dbConnection";

// const fetchItinerary = async (id) => {
//     try {
//         await connect();
//       const itinerary = await Itinerary.findById(id).populate('eventId');
//       return itinerary;
//     } catch (error) {
//       console.log('Error fetching id for itinerary', error);
//       throw error;
//     }
//   };

//   export default async function EventDetails({ params }) {
//     const itinerary = await fetchItinerary(params);
  
//     return (
//       <div>
//         <h1>{itinerary.title}</h1>
//       </div>
//     );
//   }