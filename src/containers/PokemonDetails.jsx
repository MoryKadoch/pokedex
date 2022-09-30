import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// single pokemon
export default function PokemonDetails() {
    const[data, setData] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        var url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setData(data.results);
                console.log(data.results);
                console.log(slug);
                setPokemon(data.results.filter((pokemon) => pokemon.name === slug));
               
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }
    // waitiing before rendering
    if (!pokemon) {
        return null;
    }

    return (
       /* <div id="pokemon-details">
            <h1>{pokemon.url}</h1>
            <img alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} />
        </div>*/
        data.map((pokemon) => ( slug === pokemon.name ? (
            <div id="pokemon-details">
                <h1>{pokemon.name}</h1>
                <img alt={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} />
            </div>
        ) : null))
    );
}