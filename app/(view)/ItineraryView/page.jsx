import Itinerary from "@/app/api/schema/Itinerary";
import mongoose from "mongoose";
import {getServerSideProps as itineraries} from "@/app/api/routes/itineraryroute"

export default async function Page() {
    //card view of itinerary(display)
    const itinerary = await Itinerary.find();

    // const [eventInfomration, setEventInformation] = useState([]);
    // useEffect(async () =>{
    //     const data = await itineraries();
    //     setEventInformation(data);
    // },[eventInfomration])

    return (
        <>
            {/* {JSON.stringify(itinerary)} */}
            {itinerary.map((itinerary, index) => (
                <div key={index} className="card border-dark mb-3" style={{ width: '18rem' }}>
                    <div className="card-header bg-transparent">{itinerary.title}</div>
                    <div className="card-body">
                        {itinerary.schedule.map((item, idx) => (
                            <div key={idx}>
                                <h5 className="card-title">Day: {item.day}</h5>
                                <p className="card-text">Details: {item.activity}</p>
                            </div>
                        ))};
                    </div>
                    <div className="card-footer bg-transparent ">Time</div>
                </div>
            ))};

        </>
    )
}