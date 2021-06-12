import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import formsvg from '../Images/formsvg.jpg';

export const SignUp = () => {
    const History = useHistory();

    const [user, setuser] = useState({
        name:"" , email:"" , mno:"" , profession:"" , password:"" , cpassword:""
    })

    // Collecting Inputs 
    const HandleInputs = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setuser({ ...user, [key]: value });
    }

    // Regester User 
    const regester = async (e) => {

        e.preventDefault()

        try {
            const { name, email, mno, profession, password, cpassword } = user
            
            const res = await fetch("/regester", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name , email , mno , profession , password , cpassword
                })
            })

            const data = await res.json();

            if (res.status === 422 || !data) {
                window.alert(`${data.message}`)
            } else {
                window.alert(`${data.message}.`)
                History.push("/login")
            }

        } catch (error) {
            
        }
    }



    return (
        <div className="container fixed-height d-flex justify-content-center align-items-center">
            <div className="w-75 d-flex shadow p-4 background sign-up-card"> 
                <div className="w-50 ps-4">
                   <h1 className="fw-bold">Sign Up</h1>
                   <form method="POST" className="reg-form d-flex flex-column mt-4">
                        <div className="inputs">
                            <i className="fas fa-user"></i>
                            <input type="text" name="name" value={user.name} onChange = {HandleInputs} placeholder="Your Name"/>
                        </div>
                        <div className="inputs">
                            <i className="fas fa-envelope"></i>
                            <input type="email" name="email" value={user.email} onChange = {HandleInputs} placeholder="Your Email"/>
                        </div>
                        <div className="inputs">
                            <i className="fas fa-phone-alt"></i>
                            <input type="number" name="mno" placeholder = "Mobile Number" onChange = {HandleInputs} value={user.mno} />
                        </div>
                        <div className="inputs">
                            <i className="fas fa-chalkboard-teacher"></i>
                            <input type="text" name="profession" value={user.profession} onChange = {HandleInputs} placeholder="Your Profession"/>
                        </div>
                        <div className="inputs">
                            <i className="fas fa-lock"></i>
                            <input type="password" name="password" value={user.password} onChange = {HandleInputs} placeholder="Password"/>
                        </div>
                        <div className="inputs">
                            <i className="fas fa-user-lock"></i>
                            <input type="password" name="cpassword" value={user.cpassword} onChange = {HandleInputs} placeholder="Confirm Your Password"/>
                        </div>
                        <div className="inputs">
                            <input type="submit" name="signup" className="btn btn-primary mt-3 pe-3 ps-3 pt-2 pb-2"  value="Sign-Up" onClick={regester} />
                        </div>
                   </form>
                </div> 
                <div className="reg-form-img w-50 d-flex flex-column justify-content-center align-items-center">
                    <img src={formsvg}  className="w-75 formsvg" alt=""/>
                    <Link to="/login" className="text-primary" >I am already regestered</Link>
                </div>
            </div>         
        </div>
    )
}
