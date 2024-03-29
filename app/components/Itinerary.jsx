"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { POST } from '../api/routes/itineraryroute';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter, useSearchParams } from 'next/navigation';

export default function Itinerary() {

        
    const [title, setTitle] = useState('')
    const [schedule, setSchedule] = useState([]);
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [activity, setActivity] = useState('');
    const [editText, setEditText] = useState('');
    const [editId, setEditId] = useState(null);
    const [isLoading, setLoading] = useState(false); // New state for loading
    const [eventId, setEventId] = useState(null);


    const router = useRouter();
    //this extracts eventId from the URL query parameter.
    // const {eventId} = router.query;
    useEffect(() =>{
        if(typeof window !== 'undefined'){
            const searchParams = new URLSearchParams(window.location.search);
            const eventId = searchParams.get('eventId')
            setEventId(eventId);
        }
        console.log("Current eventId:", eventId);

    },[eventId])


    const handleAddSchedule = () => {
        // Add the new schedule item
        setSchedule([...schedule, { id: Date.now(),day, time, activity }]);
        // Reset schedule input fields
        setDay('');
        setTime('');
        setActivity('');
    };


    const handleCancel = () => {
        // Reset form fields on cancel
        setDay('');
        setTime('');
        setActivity('');
        // setError('');
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        if(!eventId){
            console.error("Event ID is not set");
            setLoading(false);
            return;
        }

        const itineraryData = {
            eventId,
            title,
            schedule
        };

        try {
            await POST(itineraryData);
            setTitle('');
            setSchedule([]);
        } catch (error) {
            console.error("Error saving the itinerary:", error);
        }
        finally {
            // Set a timeout to delay the switch back
            setTimeout(() => {
                setLoading(false); // Stop loading after a delay
            }, 1000); // Delay of 2000 milliseconds (2 seconds)
        }
    };

    const handleDelete = (itemId) => {
        // Filter out the item to be deleted
        const updatedSchedule = schedule.filter((item) => item.id !== itemId);
        setSchedule(updatedSchedule);
    };

    const handleEdit = (itemId) => {
        // Find the item to be edited
        const itemToEdit = schedule.find((item) => item.id === itemId);
        if (itemToEdit) {
            setDay(itemToEdit.day);
            setTime(itemToEdit.time);
            setActivity(itemToEdit.activity);
            handleDelete(itemId); // Remove the item and ready it to be re-added once edited
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mt-10">
                    <div className="card my-3 w-75 mx-auto">
                        <div className="card-body">
                            <div className="row">
                            {/* <div className="col"> <label className="fs-3" htmlFor="title" >Select an Event: </label></div>
                                <div className="col"> <input className="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} id='title' placeholder="search an event" type="text"></input></div> */}

                                <div className="col"> <label className="fs-3" htmlFor="title" >Set a title: </label></div>
                                <div className="col"> <input className="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} id='title' placeholder="e.g. Travel itinerary" type="text"></input></div>

                            </div>
                        </div>
                    </div>

                    <div className="card mb-3 w-75 mx-auto">
                        <div className="card-body">
                            <div className='table-responsive'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Day</th>
                                            <th scope='col'>Time</th>
                                            <th scope='col'>Activity</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        <tr>
                                            <th><input type='number' min="1" name='day' value={day} onChange={(e) => setDay(e.target.value)}></input></th>
                                            <th><input type='time' name='time' value={time} onChange={(e) => setTime(e.target.value)}></input></th>

                                            <th><textarea rows="4" cols="50" name='activity' value={activity} onChange={(e) => setActivity(e.target.value)} style={{ resize: 'none' }}></textarea></th>
                                            <th> <div className="d-flex">
                                                <button onClick={ handleAddSchedule} className="btn btn-primary mx-2"
                                                    type="button">
                                                    submit
                                                </button>
                                                <button type ="button" className="btn btn-primary" onClick={handleCancel}> cancel</button>
                                            </div></th>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>

                        </div>
                    </div>

                    <div className="card mb-3 w-75 mx-auto">
                        <div className="card-body">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Day</th>
                                        <th scope='col'>Time</th>
                                        <th scope='col'>Activity</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {schedule.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.day}</td>
                                            <td>{item.time}</td>
                                            <td>{item.activity}</td>
                                            <td>
                                                <button
                                                type='button'
                                                    onClick={() => handleEdit(item.id)}
                                                    className="btn btn-primary mx-1"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                type='button'
                                                    onClick={() => handleDelete(item.id)}
                                                    className="btn btn-danger mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="card my-3 w-75 mx-auto py-3">

                            <div className='d-flex align-items-center'>



                                <button
                                    type="submit"
                                    className="btn btn-outline-dark mx-2"
                                    // disabled={!eventId}
                                    disabled={isLoading && !eventId}>
                                    {isLoading ? "Submitting..." : "Save"}
                                </button>
                                <button type="button" className="btn btn-outline-dark mx-2" onClick={() => router.push(`/listMenu?eventId=${eventId}`)}>View itinerary </button>

                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </>
    )
}