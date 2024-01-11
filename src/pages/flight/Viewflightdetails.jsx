import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Flightdetailtab from "./Flightdetailtab";
import Grid from '@mui/material/Grid';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}style={{fontSize:'14px', color:'#39BBCE'}}> 
        View Flight Details
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
      <div>
      <Flightdetailtab />
      </div>
      </Popover>
    </div>
  );
}