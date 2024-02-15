import Link from "next/link";

export default function CreateMenu() {
    return (
        <div>
            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0 p-3">
                    <div className="card border border-5">
                        <div className="card-body">
                            <h5 className="card-title">Create a packing list</h5>
                            <p className="card-text">customize a packing list to help others.</p>
                            <Link href='/createPackingList'><button className="btn btn-success">Create</button></Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 p-3">
                    <div className="card border border-5">
                        <div className="card-body">
                            <h5 className="card-title">Create an itenerary</h5>
                            <p className="card-text">Create planned routes and journeys.</p>
                           <Link href='/ItineraryCreate'><button className="btn btn-success">Create</button></Link> 
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0 p-3">
                    <div className="card border border-5">
                        <div className="card-body">
                            <h5 className="card-title">Manage a packing list</h5>
                            <p className="card-text">Update or delete your packing lists.</p>
                            <Link href="/packingView"> <button className="btn btn-primary">Manage</button></Link>
                            {/* <button type="button" className="btn btn-outline-dark ">Delete</button> */}
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 p-3">
                    <div className="card border border-5">
                        <div className="card-body">
                            <h5 className="card-title">Manage an itenerary</h5>
                            <p className="card-text">Update or delete your planned routes and journeys.</p>
                            <a href="#" className="btn btn-primary">Manage</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}