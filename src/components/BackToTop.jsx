// import { Fab, Zoom, useScrollTrigger } from "@mui/material";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// export default function BackToTop() {
//   // trigger muncul saat scroll melebihi 300px
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 300,
//   });

//   const handleClick = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <Zoom in={trigger}>
//       <Fab
//         onClick={handleClick}
//         color="success"
//         size="medium"
//         aria-label="back to top"
//         sx={{
//           position: "fixed",
//           bottom: 27,
//           right: 50,
//           zIndex: 1300, // agar selalu di atas elemen lain ege
//         }}
//       >
//         <KeyboardArrowUpIcon />
//       </Fab>
//     </Zoom>
//   );
// }
