import React, { useState } from 'react'

export const ChangePro = () => {

    const [user, setuser] = useState({
        name:"" , email:"" , mno:"" , profession:"" 
    })

    // collecting Inputs
    const handleUserInfo = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setuser({ ...user, [key]:value });
    }

    // Sending To Backend
    const PostInfo = async (e) => {
        e.preventDefault()
        try {
            const { name, email, mno, password } = user;

            const res = await fetch("/changePro", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name , email , mno , password
                })
            });

            if (res.status === 401) {
                window.alert(`Cant't Change Profile`);
            } else {
                window.alert(`Profile Changed`);
                setuser({ ...user, name: "", email: "", mno: "", profession: "" })
            }

        } catch (error) {
            
        }
    }

    return (
        <div className="container fixed-height d-flex justify-content-center align-items-center">
        <div className="w-50 d-flex shadow p-5 background sign-up-card">
          <div className="w-75     m-auto">
            <h1 className="fw-bold">Change Profile</h1>
            <form method="POST" className="reg-form d-flex flex-column mt-4">
              <div className="inputs">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleUserInfo}
                  placeholder="Your Name"
                />
              </div>
              <div className="inputs">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleUserInfo}
                  placeholder="Your Email"
                />
              </div>
              <div className="inputs">
                <i className="fas fa-phone-alt"></i>
                <input
                  type="number"
                  name="mno"
                  placeholder="Mobile Number"
                  onChange={handleUserInfo}
                  value={user.mno}
                />
              </div>
              <div className="inputs">
                <i className="fas fa-chalkboard-teacher"></i>
                <input
                  type="text"
                  name="profession"
                  value={user.profession}
                  onChange={handleUserInfo}
                  placeholder="Your Profession"
                />
              </div>
              <div className="inputs">
                <input
                  type="submit"
                  name="signup"
                  className="btn btn-primary mt-3 pe-3 ps-3 pt-2 pb-2"
                  value="Save"
                  onClick={PostInfo}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}
