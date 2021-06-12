import React, { useState, useEffect } from "react";
import user3 from "../Images/user3.jpg";
import user2 from "../Images/user2.jpg";
import { useHistory, Link } from "react-router-dom";

export const About = () => {
  const History = useHistory();

  const [userData, setuserData] = useState({});

  const getUserData = async () => {
    
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setuserData(data);

      if (res.status === 401) {
        History.push("/login");
      }

    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form method="GET">
        <div className="container fixed-height d-flex justify-content-center align-items-center">
          <div className="w-75 shadow p-4 d-flex justify-content-between background about-card">
            <div className="left-about w-25">
              <div className="user-Photo">
                <img
                  src={userData.name === "Akash Rajiwale" ? user3 : user2}
                  alt=""
                />
              </div>
              <div className="skills">
                <h6>YouTube</h6>
                <h6>Instagram</h6>
                <h6>Programmer</h6>
                <h6>Developer</h6>
                <h6>MERN Technology</h6>
                <h6>Softwere Engineer</h6>
              </div>
            </div>
            <div className="right-about flex-column">
              <div className="mb-5 mt-1 d-flex justify-content-between">
                <div>
                  <h3>{userData.name}</h3>
                  <h6 className="text-primary">{userData.profession}</h6>
                  <h6>RANKINGS 9/10</h6>
                </div>
                <div>
                  <Link className="edit-btn" to="/changePro">
                    {" "}
                    Edit Profile
                  </Link>
                </div>
              </div>
              <div className="mt-2 mb-3">
                <div className="d-flex">
                  <h6 className="p-2">About</h6>
                </div>
                <div className="indicator">
                  <div className="line"></div>
                </div>
              </div>
              <div
                className="d-flex w-100 justify-content-between info-about"
                id="home"
                role="tabpanel"
                area-aria-labelledby="home-tab"
              >
                <div>
                  <h6>User Id</h6>
                  <h6>Name</h6>
                  <h6>Email</h6>
                  <h6>Phone</h6>
                  <h6>Profession</h6>
                </div>
                <div className="text-primary fw-normal">
                  <h6>{userData._id}</h6>
                  <h6>{userData.name}</h6>
                  <h6>{userData.email}</h6>
                  <h6>{userData.mno}</h6>
                  <h6>{userData.profession}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
