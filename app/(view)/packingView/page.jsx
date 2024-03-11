 import plroute from '@/app/api/schema/packinglist'
 export default async function page() {

    const packinglist = await plroute.find();
    
    return (
        <><h1>Recommended items to bring: </h1>
            <div className='d-flex justify-content-center align-items-center mt-5'>
                
                 {packinglist.map((packlist, index) => (
                     <div key={index} className="list-group shadow-sm mx-auto w-50">
                         <ol className='list-group-numbered'>
                             {packlist.items.map((item, itemIndex) => (
                                 <li key={itemIndex} className="list-group-item fw-semibold">{item}</li>
                             ))}
                         </ol>
                     </div>
                 ))}
             </div>

         </>
     )
 }