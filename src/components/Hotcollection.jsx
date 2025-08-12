import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Hotcollection() {
  const { id } = useParams();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchHotCollection() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?userId=${id}`
      );
      setCollections(data);
    }
    fetchHotCollection();
  }, [id]);

  return (
    <div>
      {collections.map((col) => (
        <div key={col.id}>{col.id}</div>
      ))}
    </div>
  );
}
