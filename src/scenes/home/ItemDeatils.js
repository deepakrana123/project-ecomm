import React ,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../state';

const ItemDeatils = () => {
    // const dispatch = useDispatch();
    const [product,setProduct] =useState();
    const {id} =useParams();
    const [count, setCount] = useState(1);
    const [value, setValue] = useState("description");
    // const [item, setItem] = useState(null);
    const [products , setProducts]=useState();
    async function getItems(id) {
        const {data:{products}} = await axios.get("https://dummyjson.com/products");
        setProducts(products)
        const a = products.filter(( item )=>item.id === parseInt(id));
        setProduct(a[0])
        
    }
    
    useEffect(() => {
        getItems(id);
    }, [id]); 
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  return (
    product?(
        <Box width="80%" m="80px auto">
    <Box display="flex" flexWrap="wrap" columnGap="40px">
      {/* IMAGES */}
      <Box flex="1 1 40%" mb="40px">
      <img
            alt={product.title}
            width="100%"
            height="100%"
            src={product && product.thumbnail}
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{product.title}</Typography>
            <Typography>${product.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {product.description}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
              >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
                //   onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
            </Box>
            <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography sx={{fontSize:"25px",fontWeight:"600"}}>CATEGORIES: {product.category}</Typography>
          </Box> 
         {/* </Box> */}
          </Box>
        </Box>
        <Box m="20px 0">
         <Tabs value={value} onChange={handleChange}>
           <Tab label="DESCRIPTION" value="description" />
           <Tab label="REVIEWS" value="reviews" />
         </Tabs>
       </Box>
       <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && ( 
              <div>{product.description}</div>
            )}
            {value === "reviews" && <div>reviews</div>}
          </Box>
          <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {products && products.slice(0, 4).map((item, i) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      </Box>
        </Box>
        ):(

                    <div>hlo</div>
                )
  )
}

export default ItemDeatils