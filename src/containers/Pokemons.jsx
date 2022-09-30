import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
                            pokemon.name.includes(search.get("search"))
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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    function handleChange(event) {
        const filteredPokemons = data.filter((pokemon) =>
            pokemon.name.includes(event.target.value)
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
        <div>
            <h1>Pokemons</h1>
            <form>
                <input type="text" placeholder="Search..." onChange={handleChange} />
            </form>
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.name}>
                        <Link to={`/pokemon/${pokemon.name}`}>
                            {pokemon.name}
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
