import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src="../images/pngegg.png" alt="" />
                {/* <img src="./images/playstore.png" alt="" /> */}
                {/* <img src="./images/appstore.png" alt="" /> */}
            </div>
            <div className="midfooter">
                <h1>Ecommerce.</h1>
                <p>High Quality is our first priority</p>
                <p>Copyright 2021 &copy; Ashutosh</p>
            </div>
            <div className="rightfooter">
                <h4>Follow Us</h4>
                <a href="/">Instagram</a>
                <a href="/">LinkedIn</a>
                <a href="/">Youtube</a>
            </div>
        </footer>
    )
}

export default Footer