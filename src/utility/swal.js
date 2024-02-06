import swal from "sweetalert2"
import FLIGHT from "../../src/images/flights/flightnoresult.svg"
import BUS from "../../src/images/flights/flightnoresult.svg"
import HOTEL from "../../src/images/flights/flightnoresult.svg"
import PACKAGE from "../../src/images/flights/flightnoresult.svg"
import PY from "../images/img/Cancelled event-pana (1).svg"
// import { Flight } from "@mui/icons-material"
export const swalModal = (type, message, payment) => {
  const img = { flight: FLIGHT, py: PY, bus: BUS, hotel : HOTEL, package : PACKAGE }
  const dynamicImage = img[type];
  console.warn(type, dynamicImage,  "type.....")
  swal.fire({
    imageUrl: dynamicImage || FLIGHT,
    html: `<h5>${message}</h5>`,
    imageWidth: 300,
    imageHeight: 200,
    width: 350,
    height: 400,
    confirmButtonText: 'Back',
    confirmButtonColor: "#d90429",
    cancelButtonColor: "#d90429",

    // const obj = {
    //   name : "shaan"
    // }


    showClass: {
      popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
    },
    hideClass: {
      popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
    }
  })
}

