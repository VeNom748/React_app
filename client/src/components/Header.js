import React, { useContext, useEffect } from 'react';
import logo from "../Images/logo.png";
import {
    Link,
    useHistory
  } from "react-router-dom";
import { userContext } from '../App';

export const Header = () => {

    const History = useHistory();

    const { state, dispatch } = useContext(userContext)
    
    // Logout Function 
    const logout = async () => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                },
            })

            if (res.status === 401) {
                window.alert("Can't Logout")
            } else {
                dispatch({ type: "USER", payload: false });
                History.push("/login") 
            }
        } catch (error) {
            
        }
    }

    // Initial CheckUp for User Logged in or not 
    const CheckuserLogin = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })

            if (res.status === 401) {
                dispatch({ type: "USER", payload: false });
            } else {
                dispatch({ type: "USER", payload: true });
            }

        } catch (error) {
            
        }

    }
    
    useEffect(() => {
        CheckuserLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        
        <nav className="navbar shadow-sm navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ms-5">
                <img src={logo} alt="" className="logo" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-start ms-3 " id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        {state ? ""
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sign-up">Regestration</Link>
                                </li>
                                
                            </>
                        }
                    </ul>
                    {state ?
                        <div className="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">      
                            <Link className="btn btn-primary me-2 rounded-pill pe-4 ps-4" to="/Logout" onClick={logout}>Log-Out</Link>                               
                        </div>
                        :
                       "" 
                    }
                    
                </div>
            </div>
        </nav>
    )
}
