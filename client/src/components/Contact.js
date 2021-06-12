import React, { useState, useEffect } from "react";

export const Contact = () => {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    mno: "",
    message: "",
  });

  // Collecting Inputs
  const HandleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setuserData({ ...userData, [key]: value });
  };

  // fetching user Data
  const fetchContact = async () => {
    try {
      const res = await fetch("/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setuserData(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SToring User message 
  const PostInfo = async (e) => {
    e.preventDefault();

    const { name, email, mno, message } = userData;
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-type":"application/json"
        },
        body: JSON.stringify({
          name , email , mno , message
        })
      });

      const data = await res.json();

      if (res.status === 401) {
        window.alert(`${data.message}`);
      } else {
        window.alert(`${data.message}`);
        setuserData({...userData , message:""})
      }
    } catch (error) {
      
    }
  }

  return (
    <>
      <div className="container contact-card fixed-height d-flex flex-column justify-content-center align-items-center">
        <div className="information  mt-2 mb-5">
          <div className="info-card p-3 shadow-sm">
            <i className="fas fa-phone-volume text-primary"></i>
            <div className="info ps-3">
              <h6>Phone</h6>
              <p>+91 974 374 8434</p>
            </div>
          </div>
          <div className="info-card p-3 shadow-sm">
            <i className="fas fa-envelope text-primary"></i>
            <div className="info ps-3">
              <h6>Email</h6>
              <p>thisIsFake@gmail.com</p>
            </div>
          </div>
          <div className="info-card p-3 shadow-sm">
            <i className="far fa-address-card text-primary"></i>
            <div className="info ps-3">
              <h6>Address</h6>
              <p>Mumbai Maharastra India</p>
            </div>
          </div>
        </div>
        <div className="w-75 shadow pt-3 ps-5 pe-5 pb-3 background contact-box">
          <div className="w-100 p-3">
            <h2 className="fw-normal">Fill free Contact us</h2>
            <form method="post" className="reg-form">
              <div className="d-flex contact-form">
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={HandleInput}
                  placeholder="Your Name"
                />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={HandleInput}
                  placeholder="Your email"
                />
                <input
                  type="tel"
                  name="mno"
                  value={userData.mno}
                  onChange={HandleInput}
                  placeholder="Your phone number"
                />
              </div>
              <div className="contact-form">
                <textarea
                  name="message"
                  id=""
                  cols="30"
                  rows="7"
                  onChange={HandleInput}
                  value={userData.message}
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="btn btn-primary mt-4 pe-4 ps-4 pt-2 pb-2"
                    onClick={PostInfo}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
