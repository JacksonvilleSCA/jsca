"use client"
import { useState } from 'react';
import { POST } from '../api/routes/itineraryroute';
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Itinerary() {


    const [title, setTitle] = useState('')
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [activity, setActivity] = useState('');
    const [editText, setEditText] = useState('');
    const [editId, setEditId] = useState(null);

    
    const handleAddSchedule = () => {
        // Add the new schedule item
        setSchedule([...schedule, {day, time, activity }]);
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

    const itineraryData = {
        title,
        duration: {
            startDate,
            endDate,
        },
        schedule
    };

    try {
        await POST(itineraryData);
        setTitle('');
        setStartDate('');
        setEndDate('');
        setSchedule([]);
    } catch (error) {
        console.error("Error saving the itinerary:", error);
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

                                <div className="col"> <label className="fs-3" htmlFor="title" >Set a title</label></div>
                                <div className="col"> <input className="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} id='title' placeholder="e.g. Travel itinerary" type="text"></input></div>

                            </div>
                            <div className="row">
                                <div className="col"> <label className="fs-3">Set a date range</label></div>
                                <div className='col'><input type='date' name='start' className='form-control' value={startDate} onChange={(e) => setstartDate(e.target.value)}></input></div>
                                <div className='col'><input type='date' name='end'  className='form-control' value={endDate} onChange={(e) => setendDate(e.target.value)}></input></div>
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
                                        <th><input type='number' min="1" name='day' value={day} onChange={(e) => setDay(e.target.value)}></input></th>
                                        <th><input type='time'  name='time' value={time} onChange={(e) => setTime(e.target.value)}></input></th>

                                        <th><textarea rows="4" cols="50" name='activity'  value={activity} onChange={(e) => setActivity(e.target.value)} style={{ resize: 'none' }}></textarea></th>
                                        <th> <div className="d-flex">
                                            <button onClick={handleAddSchedule} className="btn btn-primary mx-2"
                                                type="button">
                                                submit
                                            </button>
                                            <button className="btn btn-primary" onClick={handleCancel} >cancel</button>
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
                                                {/* 
                                                <div className='d-flex align-items-center'>
                                                    <button type="button" className="btn btn-outline-dark mx-2">Save</button>
                                                    <button type="button" className="btn btn-outline-dark ">Delete</button>

                                                </div> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="card my-3 w-75 mx-auto">

                            <div className='d-flex align-items-center'>
                                <button type="submit" className="btn btn-outline-dark mx-2">Save</button>
                                <button type="button" className="btn btn-outline-dark ">Delete</button>

                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </>
    )
}