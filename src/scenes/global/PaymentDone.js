import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
const PaymentDone = () => {
    const seachQuery=useSearchParams()[0];
    const referenceNum = seachQuery.get("reference")
  return (
    <Box sx={{
        backgroundColor: "snow",
        color: "black",
        borderRadius: 0,
        minWidth: "100%",
        padding: "20px 40px",
        m: "20px 0",
      }}>
        <Typography sx={{color:"green", fontSize:"25px"}}>Order Sucessfull</Typography>
        <Typography sx={{color:"red",fontSize:"25px",fontWeight:"bold"}}>ReferenceNum:${referenceNum}</Typography>

    </Box>
  )
}

export default PaymentDone;