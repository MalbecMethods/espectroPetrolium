import  Nav  from "../components/Nav.jsx"
import '../../public/css/index.css'
import React, { useState, useEffect, useContext } from 'react'
import {AuthContext} from '../context/AuthContext.jsx';


export const Index = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState([])

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            setProfile(data)
        } else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }
    return(
        <>
        <Nav />
       
        <section>

            <div className="">
                <p>You are logged in to the homepage!</p>
                <p>Name: {profile.first_name} {profile.last_name}</p>
                <p>Email: {profile.email}</p>
            </div>
        </section>
            <div className='container-box'>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
        </>
    )
}
