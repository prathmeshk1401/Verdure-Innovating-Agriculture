import React from "react";
import { Link } from "react-router-dom";
import images from "../utils/importImages";

const services = [
    {
        to: "/disease-detect", 
        img: "diseaseDetection.jpg",
        alt: "AI-based plant disease detection",
        title: "Disease Detection",
        desc: "Diagnose plant diseases with AI.",
    },
    {
        to: "/cropCareReport",
        img: "cropcareReport.jpg",
        alt: "Crop care expert guidance",
        title: "CropCare Report",
        desc: "Get expert help with soil, pests, and diseases.",
    },
    {
        to: "/pmfby",
        img: "pmfby.jpg",
        alt: "PMFBY crop damage reporting",
        title: "Pradhan Mantri Fasal Bima Yojana",
        desc: "Upload crop damage and generate insurance-ready reports.",
    },
    {
        to: "/harvestHintsMain",
        img: "harvestHints.jpg",
        alt: "Personalized farming solutions",
        title: "Harvest Hints",
        desc: "Receive personalized farming solutions.",
    },
    {
        to: "/newCropHarvest",
        img: "harvestNewCrops.jpg",
        alt: "Imported crop cultivation guidance",
        title: "New Crop Harvest",
        desc: "Grow imported crops with custom soil tests, expert tips, and guided support for better yields.",
    },
    {
        to: "/farmWisdom",
        img: "farmWisdom.jpg",
        alt: "Agricultural knowledge library",
        title: "Farm Wisdom",
        desc: "Access a rich library of agricultural knowledge.",
    },
    {
        to: "/farmerForum",
        img: "farmerForum.jpg",
        alt: "Community forum for farmers",
        title: "Farmer Forum",
        desc: "Connect with fellow farmers and experts.",
    },
    {
        to: "/agriMarket",
        img: "agriMarket.jpg",
        alt: "Organic farming products marketplace",
        title: "Agri Market",
        desc: "Shop for organic farming products.",
    },
    {
        to: "/cropTrade",
        img: "cropTrade.jpg",
        alt: "Sell crops directly to consumers",
        title: "Crop Trade",
        desc: "Sell your crops directly to consumers and businesses.",
    },
    {
        to: "/Weather",
        img: "agroWeather.jpg",
        alt: "Local weather updates for farmers",
        title: "Agro Weather",
        desc: "Stay informed with local weather updates.",
    },
];

const Services = () => (
    <section className="services" id="services">
        <div className="services-text">
            <h2>Our Services</h2>
            <p>We provide comprehensive solutions for your digital needs</p>
        </div>
        <div className="services-grid">
            {services.map(({ to, img, alt, title, desc }) => {
                const content = (
                    <>
                        <div className="service-img">
                            <img src={images[img]} alt={alt} />
                        </div>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                    </>
                );

                return (
                    <div className="service-box" key={title}>
                        {to ? <Link to={to}>{content}</Link> : content}
                    </div>
                );
            })}
        </div>
    </section>
);

export default Services;
