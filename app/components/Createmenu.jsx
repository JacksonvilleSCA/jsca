"use client"
import Link from "next/link";
import { DELETE, GETROUTEBYID } from "@/app/api/routes/plroute"
import { DeleteItinerary, getItineraryById } from "../api/routes/itineraryroute";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateMenu() {

    const [eventId, setEventId] = useState(null);
    const [itineraryInfo, setItineraryInfo] = useState({});
    const [packingListInfo, setPackingListInfo] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const eventId = searchParams.get('eventId')
            setEventId(eventId);
        }
        console.log("Current eventId:", eventId);

        // if(eventId){
        //     const fetchPackingList = async () => {
        //         try{
        //             const {props: {packlist}} = await GETROUTEBYID(eventId);
        //             setPackingListInfo(packlist);
        //             console.log(packlist);
        //         }catch(error){
        //             console.log("Error fetching the data")
        //         }
        //     }

        //     fetchPackingList();
        // }

    }, [eventId])


    useEffect(() => {

        if (eventId) {
            const fetchPackingList = async () => {
                try {
                    const packlist = await GETROUTEBYID(eventId);
                    setPackingListInfo(packlist);
                    console.log(packlist);
                } catch (error) {
                    console.log("Error fetching the data")
                }
            }

            fetchPackingList();
        }

    }, [eventId])


    useEffect(() => {

        if (eventId) {
            const fetchItinerary = async () => {
                try {
                    const  itinerary  = await getItineraryById(eventId);
                    setItineraryInfo(itinerary);
                    console.log(itinerary);
                } catch (error) {
                    console.log("Error fetching the data")
                }
            }

            fetchItinerary();
        }

    }, [eventId])


        //go back function
        function returnBack(){
            router.push('/Dashboard/EventHistory/${eventId}/temp');
    
        }
        //for packing list
        const handleDelete = async () => {
            try {
                await DELETE(eventId);
                // Redirect or perform any additional action after successful deletion
                console.log('Item deleted successfully.');
                router.reload();
            } catch (error) {
                console.log("Error deleting the item");
            }
        }
        //deleting the itinerary
        const handleDeleteItinerary = async () =>{
            try{
                await DeleteItinerary(eventId);
                console.log("Item deleted successfully");
                router.reload();
            }catch(error){
                console.log("Failed to delete");
            }
        }

    return (
        <div>
            <button className="btn btn-primary mt-2 mx-auto" onClick={returnBack}> Go back</button>
            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0 p-3">
                    <div className="card h-100 border border-5 d-flex flex-column">
                        <div className="card-body">
                            <h5 className="card-title">Manage a packing list</h5>
                            <p className="card-text">Update or delete your packing list.</p>

                            {packingListInfo.items?.map((item, index) => (
                                <div key={index}>
                                    <p>item: {item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto">
                            <div className="d-flex gap-2 p-3">
                                <button type="button" className="btn btn-primary">Update</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                {/* <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#my-alert" aria-label="Close"></button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 p-3">
                    <div className="card h-100 border border-5 d-flex flex-column">
                        <div className="card-body">
                            <h5 className="card-title">Manage an itinerary</h5>
                            <p className="card-text">Update or delete your planned routes and journeys.</p>

                            <p>Itinerary for: {itineraryInfo.title}</p>

                            {itineraryInfo.schedule?.map((item, index) => (
                                <div key={index}>
                                    <p>Day: {item.day}</p>
                                    <p>Details: {item.activity}</p>
                                    <p>Time: {item.time}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto">
                            <div className="d-flex gap-2 p-3">
                                <button type="button" className="btn btn-primary">Update</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteItinerary}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}