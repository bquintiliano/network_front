import logo from '../img/logo.png'
import '../css/style.css'
import Network from './Network'


function Home(){

    

    return(
        <>
            <div align='center'>
                <img src={logo} alt="logo" className='logo'/>
            </div>
            
            <div align='center'>
            <svg xmlns="http://www.w3.org/2000/svg">
        
            <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
            </filter>
            </svg>

            <span filter-content="S" className='net'>Network</span>
            </div>

            <Network />
        
        </>
      
    )
}

export default Home