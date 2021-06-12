import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [userData, setuserData] = useState({ show: false });


  const UserHomePage = async () => {
    try {
      const res = await fetch("/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 401) {
        setuserData({ ...userData, show: false });
      } else {
        setuserData({ ...userData, name: data.name, show: true });
      }
    } catch (error) {}
  };

  useEffect(() => {
    UserHomePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <>
        <div className="container fixed-height-1 d-flex justify-content-center align-items-center  position-relative">
          <div className="text-center lh-lg">
            <p className="fs-4  roboto lh-sm text-primary">Welcome</p>
            <h1 className="fs-1 fw-bold lh-lg">{userData.name}</h1>
            <h1 className="fs-3">
              {userData.show ? "HappY , To see You Back" : "We Are The Developer"}
            </h1>

            <div className="mt-4">
              {userData.show ? (
                ""
              ) : (
                <>
                  <Link
                    className="btn btn-primary me-2 rounded-pill pe-4 ps-4"
                    to="/login"
                  >
                    Sign-in
                  </Link>
                  <Link
                    className="btn btn-primary ms-2 rounded-pill pe-4 ps-4"
                    to="/sign-up"
                  >
                    Sign-up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </>
  );
};
