import { Header } from "../components";

import { Outlet } from "react-router-dom";

import { Container } from "@mui/material";

export default function Root() {
  return (
    <>
      <Header />
      <Container sx={{ marginTop: "20px" }}>
        <Outlet />
      </Container>
    </>
  );
}