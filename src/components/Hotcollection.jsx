import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HotCollections = () => {

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollection() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setCollections(data);
  }

  useEffect(() => {
    fetchHotCollection();
  }, []);

  setTimeout(() => {
    setLoading(false)
  }, 3000);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        {loading ? (
              new Array(4).fill(0).map((_, index) => (
                <div className="px-1" key={index}>
            <div className="nft_wrap">
              <div className="skeleton-box"
                style={{width: "100%", height: "200px"}}>
              </div>
            </div>
            <div className="nft_coll_pp">
              <div className="skeleton-box"
                style={{width: "50px", height: "50px"}}>
              </div>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <div className="skeleton-box"
                style={{width: "100px", height: "20px"}}>
              </div>
              <br />
              <div className="skeleton-box"
                style={{width: "60px", height: "20px"}}>
              </div>
            </div>
          </div>
              ))) : (

                collections.map((item, index) => (
                  <div key={index} className="px-1" >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img src={`${item.nftImage}`} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy pp-coll" src={`${item.authorImage}`} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{`${item.title}`}</h4>
                        </Link>
                        <span>ERC-{`${item.code}`}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
