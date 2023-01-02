import React,{useState} from 'react'
import './Navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import PanenSahamLogo from './../assets/logo.png'
import DashboardLogo from './../assets/dashboard.png'
import NotificationLogo from './../assets/notification.png'
import ProfileLogo from './../assets/profile.png'
import { BiCaretDown } from "react-icons/bi";
import { NavLink } from 'react-router-dom'
import { AiOutlineMenu,AiOutlineCloseCircle } from "react-icons/ai";

const Navbar = () => {
    const [menuOpen,setmenuOpen] = useState(false)
    const handleClick = () => setmenuOpen(!menuOpen)
    const [marketActive,setmarketActive] = useState(false)
    const handleMarketActive = () => setmarketActive(!marketActive)
    const navigate = useNavigate();
    const handleMarket = () => {
        navigate("/");
      };
      const handleOrderBook = () => {
        navigate("/OrderBook");
      };
      
 
    return(
        <>
            <div className='navv sticky-top'>
                <div className='nav-css '>
                    <div className='nav-menuu' onClick={handleClick}><AiOutlineMenu/></div>
                    <div className='logo' onClick={handleMarket}><a href='#'><img src={PanenSahamLogo}/></a></div>    
                    <div className={!menuOpen ? 'nav-links' : 'nav-linkss'}>
                       
                        <div className='nav-menuu'>
                            <a href='#'><img src={PanenSahamLogo}/></a>
                            <span className='close' onClick={handleClick}> <AiOutlineCloseCircle/></span>
                        </div> 
                        
                        <ul className='links'>
                            <li >
                                <NavLink exact  to="/" 
                                className={({ isActive }) => (isActive ? 'nav-active' : '')}>Market</NavLink>  
                            </li>
                            <li ><NavLink  to="/OrderBook" 
                            className={({ isActive }) => (isActive ? 'nav-active' : '')}>Order Book</NavLink></li>
                            <li><NavLink exact  to="/Quotes" 
                                className={({ isActive }) => (isActive ? 'nav-active' : '')}>Quotes</NavLink></li>
                            <li>
                                <a href='#'>Tool Advanced</a>
                                <span className='arrow toolAdvanced'><BiCaretDown/></span>
                                <ul className='tool-submenu submenu'>
                                    <li><a href='#'>Chat Advanced</a></li>
                                    <li><a href='#'>Fitur Advanced</a></li>
                                </ul>
                            </li>
                            <li><a href='#'>Smart Order</a></li>
                            <li><a href='#'>Account Info</a></li>
                            <li><a href='#'>Fund Withdrawl</a></li>
                        </ul>
                    </div> 
                    <div className='nav-right'>
                        <div className='group-links'><img src={DashboardLogo}/></div>    
                        <div className='group-links'><img src={NotificationLogo}/></div>    
                        <div className='group-links'>
                            <img src={ProfileLogo} />
                            <ul className='profile-submenu submenu'>
                                <li><a href="#">ChatUs</a></li>
                                <li><a href="#">Keluar</a></li>
                            </ul>
                        </div>    
                    </div>
                </div>    
            </div>        
        </>
    )
}

export default Navbar;
