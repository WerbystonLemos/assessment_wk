import './home.css';
import '../../App.css';
import SideLeft from '../components/SideLeft/SideLeft';
import SideRight from '../components/SideRight/SideRight';

export default function Home()
{
    return(
        <div id="containerMain" className="container">

            <SideLeft/>

            <SideRight />
           
        </div>
    )
}