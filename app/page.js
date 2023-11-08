import Image from 'next/image'

import 'bootstrap/dist/css/bootstrap.css';
import CreateList from './components/CreateList';
import Itenerary from './components/Itinerary';
import Nav from './components/Nav'

export default function Home() {
  return (
   <>
   <Nav/>
   <Itenerary/>
   </>
  )
}
