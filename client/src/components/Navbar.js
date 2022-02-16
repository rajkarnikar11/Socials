import React,{useContext,useState,useRef,useEffect} from 'react';
import '../styles/Navbar.css'
import { gsap } from "gsap";
import { Link,useNavigate,NavLink } from 'react-router-dom'
import {UserContext} from '../App'
import Burger from "./screens/assets/Burger.svg" 
import Cross from "./screens/assets/Cross.svg" 
const Navbar = () => {
  const [open, setOpen] = useState(false); 
  let navRef= useRef(null);
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  
  useEffect(()=>{
    gsap.from(navRef, {y:-70,delay:.2,duration:2.8,opacity:.5 } )

    
    },[])
    const renderList=()=>{
      
      if(state){
        return [
          <NavLink  className={({ isActive }) => (isActive ? 'active-nav' : 'nav-items')} to='/profile'>Profile</NavLink>,
          <NavLink  className={({ isActive }) => (isActive ? 'active-nav' : 'nav-items')} to='/createpost'>Create Post</NavLink>,
          <NavLink  className={({ isActive }) => (isActive ? 'active-nav' : 'nav-items')} to='/'>Explore</NavLink>,
          <li >
            <button className='nav-logout' onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              navigate("/login", { replace: true });
              }} >Log out
            </button>  
          </li>
        ]
      }
      return[ 
          <NavLink  className={({ isActive }) => (isActive ? 'active-nav' : 'nav-items')} to='/login'><li >Login</li></NavLink>,
          <NavLink  className={({ isActive }) => (isActive ? 'active-nav' : 'nav-items')} to='/signup'><li >Signup</li></NavLink>
      ]
    }
  
  return (
    <div ref={el=>navRef=el} className='container'>
        <ul className="list-container">
            <li >
            <Link   to={state?'/myfollowerspost':'/login'}>
               <div className='nav-logo'>Socials</div> 
               
            </Link>
            </li>
            <li>
                <ul className={open?"list-container-right":"close"}>
                    {renderList()}
                </ul> 
                <div className='burger-container'>
                  {
                    open && <div onClick={() => setOpen(false)}> 
                      <img alt="cross" className='cross-icon' src={Cross}/>
                    </div>
                  }  
                  {
                    !open && 
                    <div  onClick={() => setOpen(true)}>
                      <img alt="drop" className='burger-icon' src={Burger}/>  
                    </div> 
                    }
                    
                </div>
            </li>
        </ul>
    </div>
  );
};

export default Navbar;
