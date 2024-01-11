import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
export default function Searchtab() {
  return (
    <Box px={10} sx={{display:'flex', justifyContent:'space-between'}}>
    
      <Button sx={{color:'black'}}>Sorting By:</Button>
      <Button sx={{color:'black'}}>Departure</Button>
      <Button sx={{color:'black'}}>Duration</Button>
      <Button sx={{color:'black'}}>Arrival</Button>
      <Button sx={{color:'black'}}>Price</Button>
   
    </Box>
  );
}