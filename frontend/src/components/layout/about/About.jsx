import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/ashutosh_dikondwar/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dpclefgw9/image/upload/v1677514275/avatars/pu7ososizk4ttzmnew2y.jpg"
              alt="Founder"
            />
            <Typography>Ashutosh Dikondwar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is ecommerce web app
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.linkedin.com/in/ashutosh-dikondwar/"
              target="blank"
            >
              <LinkedInIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/ashutosh_dikondwar/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;