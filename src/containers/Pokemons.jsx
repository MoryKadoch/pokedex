import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Typography, Avatar, Chip, Button } from "@mui/material";

export default function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const search = new URLSearchParams(window.location.search);

    useEffect(() => {
        var url = "https://pokeapi.co/api/v2/pokemon?limit=151";
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setPokemons(data.results);
                setData(data.results);
                setLoading(false);
                if (search.get("search") !== null) {
                    setPokemons(
                        data.results.filter((pokemon) =>
                            pokemon.name.includes(search.get("search").toLowerCase())
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
                            <Avatar alt="loading" src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" sx={{ width: 200, height: 200 }} />
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

    function handleChange(event) {
        const filteredPokemons = data.filter((pokemon) =>
            pokemon.name.includes(event.target.value.toLowerCase())
        );

        // URL
        window.history.pushState(
            {},
            "",
            `?search=${event.target.value}`
        );
        setPokemons(filteredPokemons);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <input type="text" placeholder="Search..." onChange={handleChange} style={{ width: "100%", height: "25px", fontSize: "20px", padding: "10px" }} />
                </Box>
            </Grid>
            {pokemons.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                    <Paper elevation={3}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                            <Avatar alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[pokemon.url.split("/").length - 2]}.png`} sx={{ width: 200, height: 200 }} />
                            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                                {pokemon.name}
                            </Typography>
                            <Chip label={pokemon.url.split("/")[pokemon.url.split("/").length - 2]} sx={{ mt: 2 }} />
                            <Button variant="contained" sx={{ mt: 2 }}>
                                <Link to={`/pokemon/${pokemon.name}`} style={{ textDecoration: "none", color: "white" }}>
                                    View
                                </Link>
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            ))}
            {pokemons.length === 0 && (<Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                        No pokemons found for : {search.get("search")}
                    </Typography>
                </Box>
            </Grid>)}
            <audio autoPlay loop>
                <source src="/p1.mp3" type="audio/mpeg" autoPlay loop />
            </audio>
        </Grid>
    );
}
