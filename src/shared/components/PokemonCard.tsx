import { useEffect, useState } from "react";
import React from "react";
import { Card } from "antd";
import { getPokemonByName } from "../services/pokemon.services";
interface DataType {
    name: string;
    url: string;
}
interface PokemonCardProps {
    pokemon: DataType;
}
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }: any ) => {
    const [imagePokemon, setImagePokemon] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [idPokemon, setIdPokemon] = useState<number>(1);
    const [typePokemon, setTypePokemon] = useState<string>("");

    useEffect(() => {
        const getPokemon = async () => {
            setIsLoading(true);
            try {
                const { data, status } = await getPokemonByName(pokemon.name);
                if (status === 200) {
                    console.log(data);
                    setIdPokemon(data.id);
                    setTypePokemon(data.types);
                    setImagePokemon(data.sprites.front_default);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getPokemon();
    }, [pokemon.url]);

    return pokemon ? (
        <Card
            title={pokemon.name}
            cover={<img alt={pokemon.name} src={imagePokemon} />}
            loading={isLoading}
        >
            #{idPokemon}
        </Card>
    ) : null;
};

export default PokemonCard;
// export {};
