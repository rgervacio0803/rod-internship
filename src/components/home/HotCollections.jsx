import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="custom-arrow next"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: "-25px",
        transform: "translateY(-50%)",
        zIndex: 2,
        width: "40px",
        height: "40px",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
    >
      <i className="fa fa-chevron-right" style={{ fontSize: 16 }}></i>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="custom-arrow prev"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "-25px",
        transform: "translateY(-50%)",
        zIndex: 2,
        width: "40px",
        height: "40px",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
    >
      <i className="fa fa-chevron-left" style={{ fontSize: 16 }}></i>
    </div>
  );
}

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 992,  settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 576,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  async function fetchHotCollection() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
  }

  useEffect(() => {
    fetchHotCollection();
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <div className="slider-container" style={{ position: "relative", marginTop: 16 }}>
          <Slider {...settings}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="px-1" key={index}>
                    <div className="nft_wrap">
                      <div className="skeleton-box" style={{ width: "100%", height: 200 }} />
                    </div>
                    <div className="nft_coll_pp" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div className="skeleton-box" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                      <i className="fa fa-check" />
                    </div>
                    <div className="nft_coll_info">
                      <div className="skeleton-box" style={{ width: 120, height: 20 }} />
                      <br />
                      <div className="skeleton-box" style={{ width: 80, height: 20 }} />
                    </div>
                  </div>
                ))
              : collections.map((item, index) => (
                  <div key={item.nftId ?? index} className="px-1">
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img src={item.nftImage} className="lazy img-fluid" alt={item.title || ""} />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy pp-coll" src={item.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;


