import React from 'react';
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeToCart,
  isCartsOpen,
} from "../../state/index";
import pixel from "../../assets/pixel.jpg";
import axios from "axios";
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartBox = () => {
  const dispatch = useDispatch();
  const cart = useSelector(( state ) => state.cart.cart);
  const isCartOpen = useSelector(( state ) => state.cart.isCartOpen);
  const totalPrice = cart.reduce((total, item ) => {
    return total + item.count * item.price;
  }, 0);

  const checkOutHandler = async(req,res)=>{
     const YOUR_KEY_ID= await axios.get('https://ecommserver.onrender.com/get/apiKey');
    const amount = await axios.post('https://ecommserver.onrender.com/api/v1/checkout',{
      totalPrice
    });
    console.log(amount ,"amount")
    var options = {
      "key": YOUR_KEY_ID.data.key, // Enter the Key ID generated from the Dashboard
      "amount":amount.data.order.amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Devendra Rana",
      "description": "Testing for razorpay",
      "image": pixel,
      "order_id": amount.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": 'https://ecommserver.onrender.com/api/v1/paymentverfication',
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },
      notes: {
          "address": "Your own address"
      },
      theme: {
          "color": "#3309cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
    dispatch(isCartsOpen({}));

  }
  return (
    <Box
    display={isCartOpen ? "block" : "none"}
    backgroundColor="rgba(0, 0, 0, 0.4)"
    position="fixed"
    zIndex={10}
    width="100%"
    height="100%"
    left="0"
    top="0"
    overflow="auto"
  >
    <Box
      position="fixed"
      right="0"
      bottom="0"
      width="max(400px, 30%)"
      height="100%"
      backgroundColor="white"
    >
      <Box padding="30px" overflow="auto" height="100%">
        {/* HEADER */}
        <FlexBox mb="15px">
          <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
          <IconButton onClick={()=>dispatch(isCartsOpen({}))}>
            <CloseIcon />
          </IconButton>
        </FlexBox>

        {/* CART LIST */}
        <Box>
          {cart.map((item) => (
            <Box key={item.id}>
              <FlexBox p="15px 0">
                <Box flex="1 1 40%">
                  <img
                    alt={item.title}
                    width="123px"
                    height="164px"
                    src={item.thumbnail}
                  />
                </Box>
                <Box flex="1 1 60%">
                  <FlexBox mb="5px">
                    <Typography fontWeight="bold">
                      {item.title}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        dispatch(removeToCart({ id: item.id }))
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </FlexBox>
                  <Typography>{item.description}</Typography>
                  <FlexBox m="15px 0">
                    <Box
                      display="flex"
                      alignItems="center"
                      border={`1.5px solid ${shades.neutral[500]}`}
                    >
                      <IconButton
                        onClick={() =>
                          dispatch(decreaseCount({ id: item.id }))
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.count}</Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(increaseCount({ id: item.id }))
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography fontWeight="bold">
                      ${item.price}
                    </Typography>
                  </FlexBox>
                </Box>
              </FlexBox>
              <Divider />
            </Box>
          ))}
        </Box>

        {/* ACTIONS */}
        <Box m="20px 0">
          <FlexBox m="20px 0">
            <Typography fontWeight="bold">SUBTOTAL</Typography>
            <Typography fontWeight="bold">${totalPrice}</Typography>
          </FlexBox>
          <Button
            sx={{
              backgroundColor: shades.primary[400],
              color: "white",
              borderRadius: 0,
              minWidth: "100%",
              padding: "20px 40px",
              m: "20px 0",
            }}
            onClick={() => {
              checkOutHandler()
            }}
          >
            CHECKOUT
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
  )
}

export default CartBox