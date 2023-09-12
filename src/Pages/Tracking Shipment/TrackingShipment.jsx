import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const TrackingShipment = () => {
  const [enteredReceipt, setEnteredReceipt] = useState("");
  const [resiInfo, setResiInfo] = useState([]);
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
        console.log(response.data.express21.results);
        setResiInfo(response.data.express21.results.resi_info);
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

      {resiInfo.map((data) => {
        return (
          <Table striped bordered border={1} hover key={data.consignee_name}>
            <thead>
              <tr>
                <th>City Destination</th>
                <th>City Origin</th>
                <th>Consignee Name</th>
                <th>Service Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.city_dest}</td>
                <td>{data.city_origin}</td>
                <td>{data.consignee_name}</td>
                <td>{data.service_type}</td>
                <td>{data.last_status_code}</td>
              </tr>
            </tbody>
          </Table>
        );
      })}
    </div>
  );
};

export default TrackingShipment;
