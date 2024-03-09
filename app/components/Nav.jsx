'use client'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/JSCALogo.webp'
import { useEffect } from 'react';

const imageStyle = {
    height: '50px',
    width: '50px',
}
//Not logged in nav bar
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
                        <Link href='/accountcreate' className="nav-link link-opacity-75-hover" >Create account</Link>
                        <Link href='/login' className="nav-link link-opacity-75-hover" >Login</Link>
                    </div>


                </div>

            </div>
        </nav>
    )
}