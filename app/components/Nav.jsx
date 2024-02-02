'use client'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/JSCALogo.webp'
import { useEffect } from 'react';

const imageStyle = {
    height: '50px',
    width: '50px',
}

export default function Nav() {

    useEffect(() => {

        require("bootstrap/dist/js/bootstrap.bundle.min.js");

    }, [])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
            <div className='container-fluid '>
                <Link href='/Dashboard/Home' className='navbar-brand' >
                    <Image className='d-inline-block align-text-middle me-2 text-break' src={logo} alt='logo' style={imageStyle} quality={100} />
                    Jacksonville Sister Cities Association
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className='navbar-nav ms-auto '>
                        <Link href='/' className="nav-link link-opacity-75-hover"> Home</Link>

                        <li className="nav-item dropdown">
                            <Link href='/' className="nav-link dropdown-toggle link-opacity-75-hover" data-bs-toggle="dropdown" aria-expanded="false" > Event</Link>

                            <ul className='dropdown-menu'>
                                <li><Link href='/Dashboard/EventHistory' className='dropdown-item'>Event List</Link></li>
                                <li><Link href='/Dashboard/Home' className='dropdown-item'>Create Event</Link></li>
                                <li><Link href='/listMenu' className='dropdown-item'> Create Itenerary</Link></li>
                                <li><Link href='/ItineraryView' className='dropdown-item'>Itenerary</Link></li>
                                <li><Link href='/createPackingList' className='dropdown-item'>Packing List</Link></li>
                            </ul>
                        </li>

                        <Link href='/' className="nav-link link-opacity-75-hover" >Members</Link>
                        <Link href='/accountcreate' className="nav-link link-opacity-75-hover" >Create account</Link>
                        <Link href='/login' className="nav-link link-opacity-75-hover" >Login</Link>
                    </div>


                </div>

            </div>
        </nav>
    )
}