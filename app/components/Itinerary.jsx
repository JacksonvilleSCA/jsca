"use client"
import { useState } from 'react';
// import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Itinerary() {


    const [title, setTitle] = useState('')
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
    const [activity, setActivity] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setisLoading(true)

      
        const newScheduleItem = { id: Date.now(), day, time, activity };
        setSchedule([...schedule, newScheduleItem]);

        // Reset form fields
        setDay('');
        setTime('');
        setActivity('');
        setIsLoading(false);

    }
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
                                        <th><input type='number' min="1" required value ={day} onChange={(e)=> setDay(e.target.value)}></input></th>
                                        <th><input type='time' required value={time} onChange={(e) => setTime(e.target.value)}></input></th>

                                        <th><textarea rows="4" cols="50" value={activity} onChange={(e)=>setActivity(e.target.value)}required style={{ resize: 'none' }}></textarea></th>
                                        <th> <div className="d-flex">
                                            <button className="btn btn-primary mx-2"
                                                type="submit" disabled={isLoading}>
                                                {isLoading && <span>Adding...</span>}
                                                {!isLoading && <span>submit</span>}
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                    <div className="card mb-3 w-75 mx-auto">
                        <div className="card-body">
                            <div className='d-flex align-items-center'>

                                <button className='btn me-auto p-2'><i className="bi bi-plus-square" style={{ fontSize: "2rem" }}></i></button>

                                <button type="button" className="btn btn-outline-dark mx-2">Save</button>
                                <button type="button" className="btn btn-outline-dark ">Delete</button>

                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </>
    )
}