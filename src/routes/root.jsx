import { Header } from "../components";

import { Outlet } from "react-router-dom";

import { Container } from "@mui/material";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <>
      <Header />
      <Container sx={{ marginTop: "20px" }}>
        <Outlet />
      </Container>
      <Footer/>
    </>
  );
}