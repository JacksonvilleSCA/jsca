import plroute from '@/app/api/schema/packinglist'
export default async function page() {

    const packignlist = await plroute.find();
    return (
        <>
            {packignlist.map((item, index) => (
                <div key={index}>
                    <ul className="list-group">
                        <li className="list-group-item">{item.items}</li>
                    </ul>
                </div>
            ))}
        </>
    )
}