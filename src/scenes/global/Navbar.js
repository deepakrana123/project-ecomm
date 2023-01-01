import React from 'react';
import { useDispatch} from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import {isCartsOpen} from "../../state/index"

const Navbar = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
 
  return (
    <Box
      display="flex"
      width="100%"
      alignItems="center"
      height="60px"
      backgroundColor="rgba(255,255,255,0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1">
      <Box
        width="80%"
        display="flex"
        margin="auto"
        alignItems="center"
        justifyContent="space-between">
        <Box
          onClick={() => navigate("/")}
          sx={{
            fontWeight: "bold",
            texttransform: "uppercase",
            '&:hover': {
              cursor: "pointer",
              color: "black"
            }
          }}
          color={shades.secondary[500]}
          fontSize="25px">Ecomm</Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{
            color: "black",
            fontSize: "20px"
          }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{
            color: "black",
            fontSize: "20px"
          }}>
            <PersonOutline />
          </IconButton>
          <Badge
          badgeContent="2"
          color="secondary"
          sx={{
            "& .MuiBadge-badge": {
              right: 5,
              top: 5,
              padding: "0 4px",
              height: "14px",
              minWidth: "13px",
            },
          }}
          >

          <IconButton sx={{
            color: "black",
            fontSize: "20px"
          }}
          >
            <ShoppingBagOutlined />
          </IconButton>
            </Badge>
          <IconButton sx={{
            color: "black",
            fontSize: "20px"
          }}
          onClick={()=>dispatch(isCartsOpen({}))}>
            <MenuOutlined />
          </IconButton>

        </Box>
      </Box>

    </Box>
  )
}

export default Navbar