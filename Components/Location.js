import axios from "axios";
import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const MapContainer = (props) => {
  const [Mapdata, setMap] = useState([]);

  useEffect(() => {
    const mapfun = async () => {
      try {
        const ans = await axios.get("http://localhost:8080/getData");
        setMap(ans.data);
      } catch (error) {
        console.log(error);
      }
    };
    mapfun();
  }, []);
  console.log(Mapdata);
  // {
  //   "id": 5,
  //   "location": "tanuku",
  //   "quantity": 6,
  //   "date": "3-Dec-2023",
  //   "coord": {
  //       "id": 5,
  //       "lat": 16.76436,
  //       "lng": 81.67882
  //   }
  // }

  const [ar, setAr] = useState([
    {
      lat: 28.70406,
      lng: 77.102493,
    },
    {
      lat: 16.69434,
      lng: 81.5903,
    },
    {
      lat: 16.5416,
      lng: 81.52793,
    },
  ]);

  return (
    <div>
      <Map
        google={props.google}
        style={{ width: "100%", height: "100%" }}
        zoom={3}
        initialCenter={{ lat: 28.70838, lng: 97.136293 }}
        mapTypeControl={true}
        mapTypeControlOptions={{
          style: props.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: props.google.maps.ControlPosition.TOP_RIGHT,
        }}
        mapType={props.google.maps.MapTypeId.HYBRID}
      >
        {Mapdata.map((e) => (
          <Marker
            key={e.id} // Add a unique key for each Marker
            title={e.location}
            position={{ lat: e.coord.lat, lng: e.coord.lng }}
          />
        ))}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDooQiotBarKJdeNXkDhmijFrEb8ojj4Mg",
})(MapContainer);
