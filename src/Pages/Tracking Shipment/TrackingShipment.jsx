import axios from "axios";
import React, { useEffect, useState } from "react";

const TrackingShipment = () => {
  const [enteredReceipt, setEnteredReceipt] = useState("");
  const [shipmentData, setShipmentData] = useState(null);
  const endpoint = "https://partner-api.21express.co.id/publics/tracking";
  const siscoToken =
    "TOBGOAV5ULI/QGN8UQCKY9M6SNP+5TZZLN/JDFLXCUSKIDADBZ6MNQWLJPVE9JKY";
  const apiKey = "X*kLJ=GDcA1q";

  const receiptChangeHandler = (e) => {
    setEnteredReceipt(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetchData(enteredReceipt);
  };

  const fetchData = async (resiNumber) => {
    try {
      const headers = {
        "Sisco-Token": siscoToken,
        "Api-Key": apiKey,
      };

      const queryParams = {
        resi_no: resiNumber,
      };

      const response = await axios.get(endpoint, {
        headers,
        params: queryParams,
      });

      if (response.status === 200) {
        setShipmentData(response.data.express21.results);
      } else {
        console.error("API Error - Status Code:", response.status);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="">Receipt Code: </label>
        <input
          type="text"
          placeholder="Enter Your Receipt Code"
          onChange={receiptChangeHandler}
          value={enteredReceipt}
        />
        <button type="submit">Enter</button>
      </form>
      {shipmentData && (
        <div>
          <h2>Shipment Information</h2>
          <pre>{JSON.stringify(shipmentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TrackingShipment;