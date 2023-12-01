import Image from 'next/image'
import styles from './page.module.css'
import Button from './components/Button/Button'
import logo from '/public/jscaNavLogo.png'


export default function Home() {
  return (
    <div className={styles.container}>
    <h1>Welcome to JSCA</h1>
    <Image
            src={logo}
            width={150}
            height={150}
            alt="JSCA Logo"
            />
    
    <div className={styles.buttonContainer}>
    <Button url="/login" text ="Log In"></Button>
    <Button url="/accountcreate" text ="Create Account"></Button>
          
    </div>
    
    
    </div>
  )
}
