import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Typography, Avatar, Chip, Button, CircularProgress } from "@mui/material";
import { Favorite, HeartBroken } from "@mui/icons-material";

export default function PokemonsFavorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFavorites();
    }
        , []);

    const getFavorites = () => {
        setLoading(true);
        setFavorites(JSON.parse(localStorage.getItem("favorites")));
        setLoading(false);
    }

    const removeFavorite = (pokemon) => {
        let newFavorites = favorites.filter((favorite) => favorite.name !== pokemon.name);
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    if (loading) {
        return (<CircularProgress />);
    }
    else {
        if (favorites.length === 0 || favorites === null) {
            return (<Typography variant="h5" component="div" sx={{ textAlign: "center", marginTop: "20px" }}>No favorites yet, go to the <Link to="/">Pokemons</Link> page and add some!</Typography>);
        }
    }

    return (
        <Grid container spacing={2}>
            {favorites.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                    <Paper elevation={3}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                            <Chip label="Remove from favorites" icon={<HeartBroken />} onClick={() => removeFavorite(pokemon)} sx={{ ml: 2, mt: 2 }} />
                            <Avatar alt={pokemon.name} src={pokemon.img} sx={{ width: 100, height: 100 }} />
                            <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                            </Typography>
                            <Button variant="contained" component={Link} to={`/pokemon/${pokemon.name}`} sx={{ mt: 2 }}>View details</Button>
                        </Box>
                    </Paper>
                </Grid>
            ))}
            <audio autoPlay loop>
                <source src="https://vgmsite.com/soundtracks/pokemon-firered-leafgreen-music-super-complete/uskaensvpu/21%20Pok%C3%A9mon%20Center.mp3" type="audio/mpeg" autoPlay loop />
            </audio>
        </Grid>
    );
}