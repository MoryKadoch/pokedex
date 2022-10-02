import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Typography, Avatar, Chip, Button } from "@mui/material";

// pokemons by types 
export default function PokemonsByTypes() {
    const [pokemons, setPokemons] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = new URLSearchParams(window.location.search);

    useEffect(() => {
        var url = "https://pokeapi.co/api/v2/type/" + search.get("type");
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setPokemons(data.pokemon);
                setData(data.pokemon);
                setLoading(false);
                if (search.get("search") !== null) {
                    setPokemons(
                        data.pokemon.filter((pokemon) =>
                            pokemon.pokemon.name.includes(search.get("search").toLowerCase())
                        )
                    );
                }
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper elevation={3}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                            <Avatar alt="loading" src="/loader.gif" sx={{ width: 200, height: 200 }} />
                            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                                Loading...
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!pokemons) {
        return null;
    }

    return (
        <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.pokemon.name}>
                    <Paper elevation={3}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                            <Avatar alt={pokemon.pokemon.name} src={pokemon.pokemon.sprites.front_default} sx={{ width: 200, height: 200 }} />
                            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                                {pokemon.pokemon.name}
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 2 }}>
                                {pokemon.pokemon.types.map((type) => (
                                    <Chip key={type.type.name} label={type.type.name} sx={{ m: 0.5 }} />
                                ))}
                            </Box>
                            <Button variant="contained" component={Link} to={"/pokemon/" + pokemon.pokemon.name} sx={{ mt: 2 }}>
                                View
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}
