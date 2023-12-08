import React from "react";
import "./App.css";
//bootstrap
//npm install react-icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegHandPointRight } from "react-icons/fa";
import Black from "./assets/img/black.png";
function Courses() {
  return (
    <div classNameName="maincontainer">
      <div className="container">
        <div className="text-center">
          <h2>Courses</h2>
        <p classNameName="lead">These courses will provide knowledge of music,chord,etc</p>
       
        </div>

        <div className="banners">
          <div className="banners2-md" style={{marginBottom:'30px'}}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={Black}
                alt="harry potter"
                style={{ width: "50vw", height: "170px" }}
              />
            </div>
          
            <FaRegHandPointRight style={{marginLeft:'220px'}}/>{' '}<a href="https://www.google.com" style={{textDecoration: 'none'}} >
            Google
            </a>
          </div>
          
          {" "}
          <div className="banners2-md" style={{marginBottom:'30px'}}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={Black}
                alt="harry potter"
                style={{ width: "50vw", height: "170px" }}
              />
            </div>
            <FaRegHandPointRight style={{marginLeft:'220px'}}/>{' '}<a href="https://www.google.com" style={{textDecoration: 'none'}} >
              Google
            </a>
          </div>{" "}


          <div className="banners2-md" style={{marginBottom:'30px'}}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={Black}
                alt="harry potter"
                style={{ width: "50vw", height: "170px" }}
              />
            </div>
            <FaRegHandPointRight style={{marginLeft:'220px'}}/>{' '}<a href="https://www.google.com" style={{textDecoration: 'none'}} >
              Google
            </a>
          </div>{" "}


          <div className="banners2-md" style={{marginBottom:'30px'}}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={Black}
                alt="harry potter"
                style={{ width: "50vw", height: "170px" }}
              />
            </div>
            
            <FaRegHandPointRight style={{marginLeft:'220px'}}/>{' '}<a href="https://www.google.com" style={{textDecoration: 'none'}} >
              Google
            </a>
          </div>
          
          {" "}
          <hr className="mb-4" />
        </div>
      </div>

      <footer className="text-muted text-center text-small">
        <p className="mb-1">&copy; 2023-2024 yourchords</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Privacy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Support</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Courses;
