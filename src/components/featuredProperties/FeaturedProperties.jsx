import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch hotel data from the API
    const fetchHotels = async () => {
      try {
        const response = await fetch("https://www.api.somanymornings.com/api/hotels");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, []); // Empty dependency array ensures the effect runs once after the initial render
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    //  nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 2560,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
          }
        },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
    
  });

 

  return (
    <section className="pink">
      <Slider {...settings}>
        {properties.map((property) => (
          <div className="single-property-slider" key={property.id}>
            <Link to={`https://www.somanymornings.com/hotels/${property._id}`}>
                <img src={property.photos[0]} alt="" className="fpImg" />
            </Link>

            <Link to={`https://www.api.somanymornings.com/api/hotels/${property.id}`}>
              <img src={property.image} className="pink1" alt="" />
            </Link>
            <span className="fpName">{property.name}</span>
            <div className="img-body">
              <span className="fpCity">{property.city}</span>
            </div>
            <div className="img-body" id="prp-price">
            <span className="fpPrice">
              ₹ {property.cheapestPrice} <span className="pricespan">/ Per Night</span>
            </span>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FeaturedProperties;