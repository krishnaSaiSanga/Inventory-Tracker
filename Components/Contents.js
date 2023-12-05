import axios from "axios";
import React, { useEffect, useState } from "react";

const Contents = () => {
  const [Data, setData] = useState([]);
  const [Place, setPlace] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Latitude, setLatitude] = useState(0.0);
  const [Longitude, setLongitude] = useState(0.0);
  const [Id, setId] = useState(0);
  const getContents = async () => {
    await axios
      .get("http://localhost:8080/getData")
      .then((res) => setData(res.data))
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    getContents();
  }, []);

  const addplace = (e) => {
    setPlace(e.target.value);
  };
  const addQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const addPost = async () => {
    await axios.post("http://localhost:8080/postdata", null, {
      params: {
        place: Place,
        quantity: Quantity,
        lat: Latitude,
        lng: Longitude,
      },
    });
    setPlace("");
    setQuantity("");
    getContents();
  };

  useEffect(() => {
    const getCoords = async () => {
      await axios
        .get(
          `https://www.mapquestapi.com/geocoding/v1/address?key=jjYv8AtS8wxUmMfo2SHyJMbSQwO3gdlJ&location=${Place}`
        )
        .then((res) => {
          setLatitude(res.data.results[0].locations[0].latLng.lat);
          setLongitude(res.data.results[0].locations[0].latLng.lng);
        })
        .catch((er) => console.log(er));
    };
    getCoords();
  }, [Quantity]);
  const DeleteItem = async (id) => {
    try {
      // Make DELETE request
      await axios.delete(`http://localhost:8080/delete?id=${id}`);

      // After successful DELETE, make GET request to update the data
      await getContents();
    } catch (error) {
      console.log(error);
    }
  };
  const Edititem = async (id, location, quantity) => {
    DeleteItem(id);
    setPlace(location);
    setQuantity(quantity);
  };

  return (
    <div>
      <div className="d-md-flex bgm mb-1 p-3 justify-content-evenly">
        <h4>Add Place : </h4>
        <input
          className="border rounded"
          placeholder="Enter Place"
          style={{ width: "50%", height: "30px" }}
          value={Place}
          onChange={addplace}
        />
        <h4>Quantity : </h4>
        <input
          className="border rounded text-center"
          style={{ width: "25px", height: "30px" }}
          placeholder="0"
          value={Quantity}
          onChange={addQuantity}
        />
        <hr />

        <button
          className=" rounded-pill conbtn text-center c1"
          style={{ height: "40px", width: "100px" }}
          onClick={addPost}
        >
          <h6>
            <strong className="text-light">Add</strong>
          </h6>
        </button>
      </div>
      {/*--------------contents--------*/}

      {Data.map((e) => (
        <div className="d-flex justify-content-center text-center" key={e.id}>
          <div
            className="d-md-flex p-3 justify-content-between border rounded-4 e4"
            style={{ width: "99%" }}
          >
            <h5>
              <strong>{e.location}</strong>
            </h5>
            <h5>
              Quantity : <strong>{e.quantity}</strong>
            </h5>
            <div>
              <button
                className=" rounded-3 conbtn me-2 e"
                style={{ width: "70px" }}
                onClick={() => Edititem(e.id, e.location, e.quantity)}
              >
                Edit
              </button>
              <button
                className=" rounded-3 conbtn e"
                onClick={() => DeleteItem(e.id)}
                style={{ width: "70px" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contents;
