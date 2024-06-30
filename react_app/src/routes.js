import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

export default function RouterApp()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/>} />
            </Routes>
        </BrowserRouter>
    )
}