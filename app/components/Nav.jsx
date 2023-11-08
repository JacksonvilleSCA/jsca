import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/JSCALogo.webp'


const imageStyle = {
    height: '50px',
    width: '50px',
}


export default function Nav() {
    return (
        <nav className="navbar bg-body-tertiary" >
            <div className='container-fluid '>
                <a className='navbar-brand'>
                    <Image className='d-inline-block align-text-middle me-2' src={logo} alt='logo' style={imageStyle} quality={100} />
                    Jacksonville Sister Cities Association
                </a>
                    <div className="nav nav-tabs">
                        <Link href='/'> <a className="nav-link link-opacity-75-hover"> Home</a> </Link>
                        <Link href='view/listMenu'> <a className="nav-link link-opacity-75-hover" >Event </a></Link>
                        <a className="nav-link link-opacity-75-hover" >Members</a>
                        <a className="nav-link link-opacity-75-hover" >Create account</a>
                        <a className="nav-link link-opacity-75-hover" >Login</a>
                    </div>
            </div>
        </nav>
    )
}