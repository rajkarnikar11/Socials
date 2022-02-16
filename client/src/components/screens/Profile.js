import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App'

import '../../styles/Profile.css'
const Profile = () => {
  const [mypics,setPics]=useState([])
  const [pop,setPop]=useState([false])
  const {state,dispatch}=useContext(UserContext)
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
  useEffect(()=>{
    fetch('/mypost',{
      headers:{
        "Authorization":'Bearer '+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(res=>{
      console.log(res)
      setPics(res.mypost)
     
    })
  },[])
  useEffect(()=>{
    if(image){
      const data = new FormData()
      data.append('file',image)
      data.append('upload_preset','Shutter')
      data.append('cloud_name','dtm704hzn')
      fetch("https://api.cloudinary.com/v1_1/dtm704hzn/image/upload",{
        method:'post',
        body:data
          }).then(res=>res.json())
          .then(data=>{
              // setUrl(data.url)
              // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
              // dispatch({type:"UPDATEPIC",payload:data.url})
              fetch('/updatepic',{
                method:"put",
                headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                  pic:data.url
                })
              }).then(res=>res.json())
              .then(result=>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
                window.location.reload()
              })
              // 
            }).catch(err=>{
              console.log(err)
            })      
    }
  },[image])
  const updatePhoto =(file)=>{
    setImage(file)
    
  }
  const CardPop = (props) => {
  
   return(
     <div>  
       
      <h1 className='pop-container' > 
        <img src={props.photo} alt="propic"/>
        {props.title}
      </h1>
     </div>
   )
  }
  return( 
  <div>
      <div className='containerdetail'>
        <div className='profile-container'>
          <img className='profilepic' alt='blank' src={state?state.pic:"loading"}></img>
          <div className='up-button'>
                    <h5 className='up-text'>Upload photo</h5>                        
                    <input  className='input-filea'
                         type="file"
                         onChange={(e)=>setImage(e.target.files[0])}/>

                    
                </div>
        </div>
        <div className='infocontainer'>
          <h2>{state?state.name:'loading'}</h2>
          <h5>{state?state.email:'loading'}</h5>
          {/* <h2>salil</h2> */}
          <div className='followcontainer'>
            <h6 className='followtext'>{mypics.length} <br/>  posts</h6>
            <h6 className='followtext'>{state?state.followers.length:"-"} <br/> followers</h6>
            <h6 className='followtext'>{state?state.following.length:"-"} <br/>  following</h6>
          </div> 
        </div>
       
      </div>
      <div className='imagecontainer'>
        {mypics?.length === 0 && (
          <div className="loader-container">
            <div className="loader"/>
          </div>
        )}
        {
          mypics?.length > 0 && mypics?.map((item,i)=>{
            return(
              <div className='profile-card-container'>
                <div className='img-wrapper'>
                  <img key={item._id}  onMouseClick={() => setPop(!pop)} className='image' src={item.photo} alt="blank"/>
                  {/* {pop &&  
                    <CardPop onMouseClick={() => setPop(!pop)} photo={item.photo} title={item.title}/>
                  } */}
                </div>
                <div className='profile-content-container'>
                  
                  <h6 className='profile-card-title'>{item.title} </h6>
                  <p className='profile-card-desc'>{item.body}</p>
                  <h6 className='profile-card-likes'>{item.likes.length} likes</h6>
                  
                </div>
              </div>
              )
          })
        }
        </div>
  </div>);
};

export default Profile;
