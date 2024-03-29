import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Box, Typography, Avatar, Chip, CircularProgress } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

// single pokemon
export default function PokemonDetails() {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        var url = 'https://pokeapi.co/api/v2/pokemon/' + slug;
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const addFavorite = (event, pokemon) => {
        var favorites = JSON.parse(localStorage.getItem("favorites"));
        if (favorites === null) {
            favorites = [];
        }
        favorites.push({ name: pokemon.name, img: pokemon.sprites.other["official-artwork"].front_default });
        localStorage.setItem("favorites", JSON.stringify(favorites));
        event.currentTarget.style.display = "none";
        var audio = new Audio('https://vgmsite.com/soundtracks/pokemon-firered-leafgreen-music-super-complete/rwcuukktpw/09%20Fanfare-%20Pok%C3%A9mon%20Obtained.mp3');
        audio.play();
        alert(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} was added to favorites! 🎉 \nClick on the heart icon in the top right corner to view your favorites.`);
    }

    if (loading) {
        return (<CircularProgress />);
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!pokemon.sprites) {
        return null;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper elevation={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                        {JSON.parse(localStorage.getItem("favorites"))?.find((favorite) => favorite.name === pokemon.name) ? <Chip label="In my favorites" icon={<Favorite />} sx={{ ml: 2, mt: 2 }} /> : <Chip label="Add to favorites" icon={<FavoriteBorder />} onClick={(event) => addFavorite(event, pokemon)} sx={{ ml: 2, mt: 2 }} />}
                        <Avatar alt={pokemon.name} src={pokemon.sprites.other["official-artwork"].front_default} sx={{ width: 200, height: 200 }} />
                        <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </Typography>
                        {pokemon.types.map((type) => (
                            <Chip
                                key={type.type.name}
                                label={type.type.name}
                                sx={{ m: 1 }}
                                color={type.type.name === "grass" ? "success" : type.type.name === "fire" ? "error" : type.type.name === "water" ? "primary" : type.type.name === "bug" ? "warning" : type.type.name === "normal" ? "default" : type.type.name === "poison" ? "secondary" : type.type.name === "electric" ? "warning" : type.type.name === "ground" ? "info" : type.type.name === "fairy" ? "success" : type.type.name === "fighting" ? "error" : type.type.name === "psychic" ? "primary" : type.type.name === "rock" ? "secondary" : type.type.name === "ghost" ? "info" : type.type.name === "ice" ? "primary" : type.type.name === "dragon" ? "error" : type.type.name === "dark" ? "warning" : type.type.name === "steel" ? "secondary" : type.type.name === "flying" ? "info" : "success"}
                            />
                        ))}
                        <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                            Height: {pokemon.height}
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                            Weight: {pokemon.weight}
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ mt: 2 }}>
                            Base experience: {pokemon.base_experience}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper elevation={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                        <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                            Abilities
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 2 }}>
                            {pokemon.abilities.map((ability) => (
                                <Chip key={ability.ability.name} label={ability.ability.name} sx={{ m: 1 }} />
                            ))}
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper elevation={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                        <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                            Stats
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 2 }}>
                            {pokemon.stats.map((stat) => (
                                <Chip key={stat.stat.name} label={stat.stat.name + ": " + stat.base_stat} sx={{ m: 1 }} />
                            ))}
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper elevation={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                        <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                            Moves
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 2 }}>
                            {pokemon.moves.map((move) => (
                                <Chip key={move.move.name} label={move.move.name} sx={{ m: 1 }} />
                            ))}
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}

