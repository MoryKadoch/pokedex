import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Typography, Avatar, Chip, Button } from "@mui/material";

export default function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (params.get("type") === null) {
            var url = "https://pokeapi.co/api/v2/pokemon?limit=151";
        } else {
            var url = "https://pokeapi.co/api/v2/type/" + params.get("type");
        }
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(url);
                if (params.get("type") === null) {
                    console.log(data.results);
                    setPokemons(data.results);
                    setData(data.results);
                }
                else {
                    // format data
                    data.results = [];
                    data.pokemon.forEach((pokemon) => {
                        if (pokemon.pokemon.url.split("/")[6] < 152) {
                            data.results.push({
                                name: pokemon.pokemon.name,
                                url: pokemon.pokemon.url
                            });
                        }
                    });
                    setPokemons(data.results);
                    setData(data.results);
                }
                setLoading(false);
                if (params.get("search") !== null) {
                    filter(data.results, params.get("search"));
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

    function handleChange(event) {
        // URL
        if (params.get("type") === null) {
            window.history.pushState(
                {},
                "",
                `?search=${event.target.value}`
            );
        } else {
            window.history.pushState(
                {},
                "",
                `?type=${params.get("type")}&search=${event.target.value}`
            );
        }

        filter(data, event.target.value);
    }

    function handleChange2(event) {
        // URL
        // chip value
        let type = event.target.parentNode.getAttribute("value");
        if (type !== null) {
            // if all remove type
            if (type === "all") {
                if (params.get("search") === null) {
                    window.history.pushState(
                        {},
                        "",
                        `/`
                    );
                }
                else {
                    window.history.pushState(
                        {},
                        "",
                        `?search=${params.get("search")}`
                    );
                }
                window.location.reload();
                return;
            }
            console.log(event.target.parentNode);
            if (params.get("search") === null) {
                window.history.pushState(
                    {},
                    "",
                    `?type=${type}`
                );
            } else {
                window.history.pushState(
                    {},
                    "",
                    `?type=${type}&search=${params.get("search")}`
                );
            }
            // reload
            window.location.reload();
            return;
        }
    }

    function filter(datas, name) {
        const filteredPokemons = datas.filter((pokemon) =>
            pokemon.name.includes(name.toLowerCase())
        );
        setPokemons(filteredPokemons);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <input type="text" placeholder="Search..." onChange={handleChange} style={{ width: "100%", height: "25px", fontSize: "20px", padding: "10px" }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, width: "100%" }}>
                    <Chip label="All" value="all" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Normal" value="normal" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Fire" value="fire" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Water" value="water" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Electric" value="electric" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Grass" value="grass" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Ice" value="ice" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Fighting" value="fighting" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Poison" value="poison" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Ground" value="ground" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Flying" value="flying" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Psychic" value="psychic" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Bug" value="bug" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Rock" value="rock" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Ghost" value="ghost" onClick={handleChange2} sx={{ m: 1 }} />
                    <Chip label="Dragon" value="dragon" onClick={handleChange2} sx={{ m: 1 }} />
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
                            <Button variant="contained" sx={{ mt: 2 }} component={Link} to={`/pokemon/${pokemon.name}`}>View</Button>
                        </Box>
                    </Paper>
                </Grid>
            ))}
            {pokemons.length === 0 && (<Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                        No pokemons found for : {params.get("search")}
                        {params.get("type") === null ? "" : ` and type : ${params.get("type")}`}
                    </Typography>
                </Box>
            </Grid>)}
            <audio autoPlay loop>
                <source src="/p1.mp3" type="audio/mpeg" autoPlay loop />
            </audio>
        </Grid>
    );
}
