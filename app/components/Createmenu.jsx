"use client"
import { DELETE, GETROUTEBYID, UPDATEBYID } from "@/app/api/routes/plroute"
import { DeleteItinerary, getItineraryById, UpdateItinerary } from "../api/routes/itineraryroute";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function CreateMenu() {

    const [eventId, setEventId] = useState(null);
    const [itineraryInfo, setItineraryInfo] = useState({});
    const [packingListInfo, setPackingListInfo] = useState({});
    //for Itinerary
    const [title, setTitle] = useState('')
    const [schedule, setSchedule] = useState([]);
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [activity, setActivity] = useState('');

    //for packing list 
    const [tasks, setTasks] = useState([]); //array holding the packing list items
    const [newTask, setNewTask] = useState(''); //value of input fields for adding new task
    const [edit, setEdit] = useState(null); //holds the id of the task being 
    const [editText, setEditText] = useState(''); //holds the text of the task being edited
    const [isEditing, setIsEditing] = useState(false); // State variable for editing mode
    const [isEditing2, setIsEditing2] = useState(false); // State variable for editing mode

    const router = useRouter();

    useEffect(() => {



        const fetchData = async () => {
            if (typeof window !== 'undefined') {
                const searchParams = new URLSearchParams(window.location.search);
                const eventId = searchParams.get('eventId')
                setEventId(eventId);
            }


            const packlist = await GETROUTEBYID(eventId);
            setPackingListInfo(packlist);
            console.log(packlist);


            const itinerary = await getItineraryById(eventId);
            setItineraryInfo(itinerary);
            console.log(itinerary);



        }

        fetchData();

    }, [eventId])



    //delete the packinglist
    const handleDelete = async () => {
        try {
            // Ask for confirmation before deleting
            const confirmed = window.confirm("Are you sure you want to delete this item?");
            if (!confirmed) {
                return; // Do nothing if the user cancels
            }
            await DELETE(eventId);
            

            if (!packingListInfo) {
                throw new Error('No data exists.')
            }

            alert('Packing list Item deleted successfully.');
            window.location.reload()
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    }
    //deleting the itinerary
    const handleDeleteItinerary = async () => {
        try {

            // Ask for confirmation before deleting
            const confirmed = window.confirm("Are you sure you want to delete this item?");
            if (!confirmed) {
                return; // Do nothing if the user cancels
            }
            await DeleteItinerary(eventId);
            if (!itineraryInfo) {
                throw new Error('Failed to delete')
            }
            //add success banners for UI
            alert(" Itinerary Item deleted successfully");
            window.location.reload()
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    }
    //for Itinerary
    const handleAddSchedule = () => {
        // Add the new schedule item
        setSchedule([...schedule, { day, time, activity }]);
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


    const handleDeleting = (itemId) => {
        // Filter out the item to be deleted
        const updatedSchedule = schedule.filter((item) => item.id !== itemId);
        setSchedule(updatedSchedule);
    };

    const handleEditing = (itemId) => {
        // Find the item to be edited
        const itemToEdit = schedule.find((item) => item.id === itemId);
        if (itemToEdit) {
            setDay(itemToEdit.day);
            setTime(itemToEdit.time);
            setActivity(itemToEdit.activity);
            handleDeleting(itemId); // Remove the item and ready it to be re-added once edited
        }
    }

    //pl
    const addTask = () => {
        if (!newTask) return; // Don't add empty tasks
        setTasks([...tasks, { id: Date.now(), text: newTask }]);
        setNewTask('');
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const startEdit = (task) => {
        setEdit(task.id);
        setEditText(task.text);
    };

    const applyEdit = (taskId) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, text: editText } : task)));
        setEdit(null);
        setEditText('');
    };


    //handle go back to view
    const goBack = async () => {
        setIsEditing(false);
    }

    const goBack2 = async () => {
        setIsEditing2(false);
    }

    //for it
    const handleOtherEdit = async () => {
       //start edit mode  
        if (!itineraryInfo || !itineraryInfo.schedule || itineraryInfo.schedule.length === 0) {
            // If no packing list information exists, prompt the user to create one
            const confirmCreate = window.confirm('There is no itinerary created yet. Would you like to create one?');
            if (confirmCreate) {
                // Navigate to the createPackingList page
                router.push(`/ItineraryCreate?eventId=${eventId}`);
            }
        } else {
            // If packing list information exists, set editing mode
            setIsEditing2(!isEditing2);
        }

    }
    //for pl
    const handleEdit = async () => {

          //start edit mode  
        if (!packingListInfo || !packingListInfo.items || packingListInfo.items.length === 0) {
            // If no packing list information exists, prompt the user to create one
            const confirmCreate = window.confirm('There is no packing list created yet. Would you like to create one?');
            if (confirmCreate) {
                // Navigate to the createPackingList page
                router.push(`/createPackingList?eventId=${eventId}`);
            }
        } else {
            // If packing list information exists, set editing mode
            setIsEditing(!isEditing);
        }
      
    }


//for PL
const handleUpdate = async () => {

    const packingListData = {
        items: tasks.map(task => task.text)
    }

    try {
        await UPDATEBYID(eventId, packingListData);
        goBack();
        alert("List Updated successfully")
        location.reload()


    } catch (error) {
        console.error('Failed to update:', error);
    }
}


const handleUpdateItinerary = async () => {
    const ItineraryData = {
        title,
        schedule
    }
    try {
        await UpdateItinerary(eventId, ItineraryData)
        goBack2()
        alert('Itinerary updated successfully')
        location.reload()

    } catch (error) {
        console.error('Failed to update:', error);
    }
}

return (

    <div>


        {/* <button className="btn btn-primary mt-2 mx-auto" onClick={returnBack}> Go back</button> */}
        <div className="row">
            <div className="col-sm-6 mb-3 mb-sm-0 p-3 d-flex">
                {isEditing ? (
                    <div className="w-100">
                        <div className="card h-100 border border-5 d-flex flex-column">
                            <div className="card-body">
                                <h5 className="card-title">Manage a packing list</h5>
                                <p className="card-text">Updating the packing list will overwrite the previous items.</p>
                                <div className="d-flex">
                                    <input
                                        className='form-control w-25'
                                        name='items'
                                        type="text"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                            }
                                        }}
                                        placeholder="Add a new item"
                                    />
                                    <button className='btn btn-primary ms-2' type='button' onClick={addTask}>Add</button>
                                </div>

                                {tasks.map((task) => (
                                    <div key={task.id}> {/* Use a combination of task.id and index to ensure uniqueness */}
                                        {edit === task.id ? (
                                            <div className='d-flex justify-content-center m-auto mt-2'>
                                                <input
                                                    className='form-control w-auto'
                                                    type="text"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                />
                                                <button className='btn btn-success btn-sm mx-2' type='button' onClick={() => applyEdit(task.id)}>Save</button>
                                                <button className="btn btn-danger btn-sm mx-2" type='button' onClick={() => setEdit(null)}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div className="d-flex justify-content-between align-items-center w-100 mt-2">
                                                <span className="me-auto">{task.text || task}</span>
                                                <button className="btn btn-warning btn-sm mx-2" type='button' onClick={() => startEdit(task)}>Edit</button>
                                                <button className="btn btn-danger btn-sm mx-2" type='button' onClick={() => deleteTask(task.id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-auto">
                                <div className="d-flex gap-2 p-3">
                                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save</button>
                                    <button type="button" className="btn btn-danger" onClick={goBack}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-100">
                        <div className="card h-100 border border-5 d-flex flex-column">
                            <div className="card-body">
                                <h5 className="card-title">Manage a packing list</h5>
                                <p className="card-text">Update or delete your packing list.</p>
                                {packingListInfo && <p className="display-6 fs-3">Recommended Items to bring</p>}
                                {packingListInfo && packingListInfo.items && packingListInfo.items.length > 0 ? (

                                    packingListInfo.items?.map((item, index) => (
                                        <div key={index}>
                                            <ul>
                                                <li>
                                                <p className="lead"> {item}</p>
                                                </li>
                                            </ul>
                                           
                                        </div>
                                    ))


                                ) : (
                                    <p> No information </p>
                                )}

                            </div>
                            <div className="mt-auto">
                                <div className="d-flex gap-2 p-3">
                                    <button type="button" className="btn btn-primary" onClick={handleEdit}>Update</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                    {/* <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#my-alert" aria-label="Close"></button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="col-sm-6 p-3 d-flex">

                {isEditing2 ? (
                    <div className="w-100">
                        <div className="card h-100 border border-5 d-flex flex-column">
                            <div className="card-body">
                                <h5 className="card-title">Manage an itinerary</h5>
                                <p className="card-text">Updating the Itinerary will overwrite the previous journey.</p>
                                <div className="col"> <label className="fs-3" htmlFor="title" >Set a title: </label></div>
                                <div className="col"> <input className="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} id='title' placeholder="e.g. Travel itinerary" type="text"></input></div>
                                <div className="table-responsive">
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

                                <div className="table-responsive">

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
                                                <tr key={item._id}>
                                                    <td>{item.day}</td>
                                                    <td>{item.time}</td>
                                                    <td className="text-wrap">{item.activity}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEditing(item.id)}
                                                            className="btn btn-primary mx-1 my-3"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="buttom"
                                                            onClick={() => handleDeleting(item.id)}
                                                            className="btn btn-danger mx-1 my-3"
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
                            <div className="mt-auto">
                                <div className="d-flex gap-2 p-3">
                                    <button type="submit" className="btn btn-primary" onClick={handleUpdateItinerary}>Save</button>
                                    <button type="button" className="btn btn-danger" onClick={goBack2}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-100">
                        <div className="card h-100 border border-5 d-flex flex-column">
                            <div className="card-body">
                                <h5 className="card-title">Manage an itinerary</h5>
                                <p className="card-text">Update or delete your planned routes and journeys.</p>
                                {itineraryInfo.title && <div><p className="fw-medium d-inline">Itinerary for: <p className="lead d-inline">{itineraryInfo.title}</p></p></div>}


                                {itineraryInfo.schedule && itineraryInfo.schedule.length > 0 ? (

                                    itineraryInfo.schedule?.map((item, index) => (
                                        <div key={index}>
                                            <hr className="border border-primary border-3 opacity-75"/>
                                          <div>  <p className=" fw-medium d-inline">Day:<p className="lead d-inline"> {item.day}</p> </p> </div>
                                           <div> <p className="fw-medium d-inline">Time: <p className="lead d-inline">{item.time}</p> </p> </div>
                                            <p className="fw-medium d-inline">Details: <p className="lead d-inline text-wrap">{item.activity}</p> </p>
                                        </div>
                                    ))

                                ) : (
                                    <p> No information </p>
                                )}

                            </div>
                            <div className="mt-auto">
                                <div className="d-flex gap-2 p-3">
                                    <button type="button" className="btn btn-primary" onClick={handleOtherEdit}>Update</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteItinerary}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



            </div>
            {/*where row dive and first dive end*/}
        </div>
    </div>

)
}