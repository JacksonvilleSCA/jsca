"use client"
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Itinerary() {


    const [title, setTitle] = useState('')
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [activity, setActivity] = useState('');
    // const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch('http://localhost:3000/api/schedule', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    day,
                    time,
                    activity,
                }),
            });
    
            // Check if the response status is not in the 2xx range (e.g., 404, 500)
            if (!res.ok) {
                throw new Error('Failed to submit data');
            }
    
            // Assuming the server returns a JSON response
            const { msg } = await res.json();
    
            // Do something with the success message if needed
            console.log(msg);
    
            const newScheduleItem = { id: Date.now(), day, time, activity };
            setSchedule([...schedule, newScheduleItem]);
    
            // Reset form fields
            // setDay('');
            // setTime('');
            // setActivity('');
    
        } catch (error) {
            // Handle errors, such as network issues, failed fetch, etc.
            console.error('Error submitting data:', error);
    
            // Set an error state or display an error message to the user
            setError('Failed to submit data');
        }
    };
    

    // const handleSubmit = async (e) => {
    //     e.preventDefault() //prevents reloading the browser
    //     // setisLoading(true)

    //     const res = await fetch('http://localhost:3000/api/schedule', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             title,
    //             day,
    //             time,
    //             activity,
    //         }),
    //     });
    //     //what is this for??
    //     // const { msg } = await res.json();
    //     // setError(msg);
    //     // console.log(error)


    //     const newScheduleItem = { id: Date.now(), day, time, activity };
    //     setSchedule([...schedule, newScheduleItem]);

    //     // Reset form fields
    //     setDay('');
    //     setTime('');
    //     setActivity('');
    //     // setIsLoading(false);

    //     const { msg } = await res.json();
    //     setError(msg);
    //     console.log(error);


    // };
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

                                <div className="col"> <label className="fs-3" htmlFor="title" >Set a title</label></div>
                                <div className="col"> <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id='title' placeholder="e.g. Travel itinerary" type="text"></input></div>

                            </div>
                            <div className="row">
                                <div className="col"> <label className="fs-3">Set a date range</label></div>
                                <div className='col'><input type='date' className='form-control' value={startDate} onChange={(e) => setstartDate(e.target.value)}></input></div>
                                <div className='col'><input type='date' className='form-control' value={endDate} onChange={(e) => setendDate(e.target.value)}></input></div>
                                {/* <div className="col"><DateRangePicker onChange={setValue} value={value} /></div> */}
                                {/* <p>The value is : {Array.isArray(value) ? value.map(date => date?.toString()).join(' - ') : value?.toString()}</p> */}
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
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    <tr>
                                        <th><input type='number' min="1" required value={day} onChange={(e) => setDay(e.target.value)}></input></th>
                                        <th><input type='time' required value={time} onChange={(e) => setTime(e.target.value)}></input></th>

                                        <th><textarea rows="4" cols="50" value={activity} onChange={(e) => setActivity(e.target.value)} required style={{ resize: 'none' }}></textarea></th>
                                        <th> <div className="d-flex">
                                            <button className="btn btn-primary mx-2"
                                            type="submit" >
                                                submit
                                            </button>
                                            <button className="btn btn-primary" >cancel</button>
                                        </div></th>
                                    </tr>
                                </tbody>
                            </table>
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
                                                    onClick={() => handleEdit(item.id)}
                                                    className="btn btn-primary mx-1"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="btn btn-danger mx-1"
                                                >
                                                    Delete
                                                </button>

                                                <div className='d-flex align-items-center'>
                                                    <button type="button" className="btn btn-outline-dark mx-2">Save</button>
                                                    <button type="button" className="btn btn-outline-dark ">Delete</button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
            <div>
                <div>
                    Error message
                </div>
            </div>
        </>
    )
}