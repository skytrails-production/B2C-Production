import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@mui/material/Link";
import {
  Form,
  Header,
  Inputs,
  InputContainer,
  Input,
  Checkbox_Container,
  Input_Checkbox,
  CheckboxText,
  Sign_in_Btn,
} from "../utility/CSS/FormStyle";

import "./card.css";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1043,
  height: 540,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  zIndex: '99999999999'
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function SignUp({ isRegModalOpen, setRegIsModalOpen }) {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSignUpRoute = location.pathname === "/signup";

  const [value, setValue] = useState();

  return (
    <div>
      <Modal
        // open={isSignUpRoute ? true : open}
        open={isRegModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="background_login ">
          <Grid style={{ marginTop: '-25px' }} container spacing={2} alignItems="center">
            <Grid xs={6} md={6}></Grid>
            <Grid
              xs={6}
              md={6}
              display="flex"
              justifyContent="center"
              textAlign="center"
              alignItem="center"
            >

              <Form class="form">

                <Header class="header">Sign Up</Header>
                <Inputs class="inputs">
                  <Input placeholder="User Name" class="input" type="text" />
                  <Input placeholder="Your Email" class="input" type="email" />
                  <Input placeholder="Password" class="input" type="password" />
                  <Input placeholder="mobile" class="input" type="text" />

                  <Sign_in_Btn class="sigin-btn">Sign up</Sign_in_Btn>
                  <Typography sx={{ fontSize: "12px", fontWeight: "bold", marginTop: "8px" }} >Already have Account / <Link href="#" onClick={handleOpen}>Signup</Link></Typography>

                  <Typography color='black' fontSize='10px' >By proceeding, you agree to skytrails <Link href="#" underline="always" color="#FF5733">
                    {'Privacy Policy'}
                  </Link> , <Link href="#" underline="always" color="#FF5733">
                      {'User Agreement'}
                    </Link> and <Link href="#" underline="always" color="#FF5733">
                      {'Terms of Service'}
                    </Link>
                  </Typography>
                </Inputs>
              </Form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
