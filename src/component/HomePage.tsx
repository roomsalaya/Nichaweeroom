import React from "react";
import "./HomePage.css";
import img1 from "../assets/img/แจ้งซ่อมแซมตามจุดต่าง ๆ.png"; // Adjust path if needed
import img2 from "../assets/img/แจ้งรับพัสดุ.png";

const HomePage: React.FC = () => {
    return (
        <div className="home-center">
            <div className="homepage-container">
                <header className="homepage-header">
                    <h4>อัพเดทข่าวสาร</h4>
                    <div id="carouselExampleDark" className="carousel carousel-dark slide">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src={img1} className="d-block w-100" alt="3k" />
                            </div>
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src={img2} className="d-block w-100" alt="3k" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default HomePage;
