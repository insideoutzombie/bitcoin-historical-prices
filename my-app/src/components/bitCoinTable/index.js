/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
// import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@material-ui/core";
// import moment from "moment";
// import { useTranslation } from "react-i18next";
// import momentTZ from "moment-timezone";
import useTable from "./useTable";
// import "./orders.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    backgroundColor: "#161C24",
  },
});

const CustomTable = () => {
  const [records, setRecords] = useState([]);
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  let headCells = [
    { id: "close", label: "Close", disableSorting: false },
    { id: "high", label: "High", disableSorting: false },
    { id: "low", label: "Low", disableSorting: false },
    { id: "market_cap", label: "Market Cap", disableSorting: false },
    { id: "open", label: "Open", disableSorting: false },
    { id: "time_close", label: "Time Close", disableSorting: false },
    { id: "time_open", label: "Time Open", disableSorting: false },
    { id: "volume", label: "Volume", disableSorting: false },
  ];

  const getBitCoins = async () => {
    var res = await axios.get(
      `https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2019-01-01&end=2019-01-20`
    );
    setRecords(res.data);
    console.log("data", res.data);
  };

  useEffect(() => {
    getBitCoins();
  }, []);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  return (
    <ul className="table-container">
      <Paper className={classes.pageContent} style={{ background: "#161C24" }}>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, i) => (
              <TableRow key={i}>
                <TableCell style={{ color: "#fff" }}>{item.close}</TableCell>
                <TableCell style={{ color: "#fff" }}>{item.high}</TableCell>
                <TableCell style={{ color: "#fff" }}>{item.low}</TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {item.market_cap}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>{item.open}</TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {item.time_close}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>
                  {item.time_open}
                </TableCell>
                <TableCell style={{ color: "#fff" }}>{item.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        {false ? (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <CircularProgress style={{ color: "#1CCAFF" }} />
          </div>
        ) : null}
        <>
          {false ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <CircularProgress />
            </div>
          ) : null}
        </>
        <TblPagination />
      </Paper>
    </ul>
  );
};

export default CustomTable;
