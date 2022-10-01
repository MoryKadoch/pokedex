import { NavLink } from "react-router-dom";
//  @mui/material
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <NavLink to="/pokemons" style={{ textDecoration: "none", color: "white" }}>
                        Pokemons
                    </NavLink>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
