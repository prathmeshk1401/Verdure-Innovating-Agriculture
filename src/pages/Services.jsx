import React from "react";
import images from "../utils/importImages";

const services = [
    {
        href: "/disease-detect", 
        img: "diseaseDetection.jpg",
        alt: "diseaseDetection",
        title: "Disease Detection",
        desc: "Diagnose plant diseases with AI.",
    },
    {
        href: "/cropCareReport",
        img: "cropcareReport.jpg",
        alt: "cropcareReport",
        title: "CropCare Report",
        desc: "Get expert help with soil, pests, and diseases.",
    },
    {
        href: "/harvestHintsMain",
        img: "harvestHints.jpg",
        alt: "harvestHints",
        title: "Harvest Hints",
        desc: "Receive personalized farming solutions.",
    },
    {
        href: "/newCropHarvest",
        img: "harvestNewCrops.jpg",
        alt: "harvestNewCrops",
        title: "New Crop Harvest",
        desc: "Empower farmers to cultivate imported crops with personalized soil testing, expert advice, and step-by-step guides, ensuring optimal growth and increased income.",
    },
    {
        href: "/farmWisdom",
        img: "farmWisdom.jpg",
        alt: "farmWisdom",
        title: "Farm Wisdom",
        desc: "Access a rich library of agricultural knowledge.",
    },
    {
        href: "/farmerForum",
        img: "farmerForum.jpg",
        alt: "farmerForum",
        title: "Farmer Forum",
        desc: "Connect with fellow farmers and experts.",
    },
    {
        href: "/agriMarket",
        img: "agriMarket.jpg",
        alt: "agriMarket",
        title: "Agri Market",
        desc: "Shop for organic farming products.",
    },
    {
        href: "/cropTrade",
        img: "cropTrade.jpg",
        alt: "cropTrade",
        title: "Crop Trade",
        desc: "Sell your crops directly to consumers and businesses.",
    },
    {
        href: "/agroWeather",
        img: "agroWeather.jpg",
        alt: "agroWeather",
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
            {services.map((service, idx) => (
                <div className="service-box" key={idx}>
                    {service.href ? (
                        <a href={service.href}>
                            <div className="service-img">
                                <img src={images[service.img]} alt={service.alt} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </a>
                    ) : (
                        <>
                            <div className="service-img">
                                <img src={images[service.img]} alt={service.alt} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    </section>
);

export default Services;