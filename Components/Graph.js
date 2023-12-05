import axios from "axios";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
const Graph = () => {
  const [Data, setData] = useState([]);
  const [Avg, setAvg] = useState(0);
  const [val, setVal] = useState([]);
  const [xval, setXval] = useState([]);

  useEffect(() => {
    const graphDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getChart");
        setData(response.data);
        const gettingAvg = await axios.get("http://localhost:8080/getAvg");
        setAvg(gettingAvg.data);
      } catch (error) {
        console.error(error);
      }
    };

    graphDetails();

    // Extract dates and values from the response data
    const dates = Data.map((e) => e[0]);
    const values = Data.map((e) => e[1]);

    // Set the extracted dates and values to state
    setVal(dates);
    setXval(values);
  }, [Data]); // Add Data as a dependency for useEffect

  const [hart, setHart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: val,
      },
    },
    series: [
      {
        name: "Quantity",
        data: xval,
      },
    ],
  });

  useEffect(() => {
    setHart((prevHart) => ({
      ...prevHart,
      options: {
        ...prevHart.options,
        xaxis: {
          categories: val,
        },
      },
      series: [
        {
          name: "series-1",
          data: xval,
        },
      ],
    }));
  }, [val, xval]);

  return (
    <div>
      <div style={{ width: "70%" }}>
        <Chart
          options={hart.options}
          series={hart.series}
          type="line"
          width="80%"
        />
      </div>
      {xval[xval.length - 1] > Avg ? (
        <div className="b mx-1 p-5 rounded mb-5">
          <h4>
            The product is in demand..this is the best time to increase
            production
          </h4>
        </div>
      ) : (
        <div className="r mx-1 p-5 rounded mb-5">
          <h4>
            The product is not in demand..decrease the production or make
            changes in the product
          </h4>
        </div>
      )}
    </div>
  );
};

export default Graph;
