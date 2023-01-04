import { useEffect, useState } from "react";
import React from "react";
import { Badge, Card, Image, Progress, Tag } from "antd";
import { getPokemonByName } from "../services/pokemon.services";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
interface DataType {
    name: string;
    url: string;
}
interface PokemonCardProps {
    pokemon: DataType;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }: any) => {
    const [imagePokemon, setImagePokemon] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [idPokemon, setIdPokemon] = useState<number>(1);
    const [typePokemon, setTypePokemon] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [statsPokemon, setStatsPokemon] = useState<any[]>([]);

    const pad = (number: number, length: number) => {
        let str = "" + number;
        while (str.length < length) str = "0" + str;
        return str;
    };

    const getPokemonImageUrl = async (id: number, url: string) => {
        try {
            await axios.get(`/thumbnails-compressed/${pad(id, 3)}.png`);
            return `/thumbnails-compressed/${pad(id, 3)}.png`;
        } catch (error) {
            console.log(error);
            return url;
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const pokemonType = (typePokemon: any) => {
        return typePokemon
            ? typePokemon.map(
                  (type: any) =>
                      type.type.name[0].toUpperCase() + type.type.name.slice(1)
              )
            : null;
    };

    useEffect(() => {
        const getPokemon = async () => {
            setIsLoading(true);
            try {
                const { data, status } = await getPokemonByName(pokemon.name);
                if (status === 200) {
                    setIdPokemon(data.id);
                    setTypePokemon(data.types);
                    setStatsPokemon(data.stats);
                    setImagePokemon(
                        await getPokemonImageUrl(
                            data.id,
                            data.sprites.front_default
                        )
                    );
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
        <>
            <Badge.Ribbon
                text={`#${idPokemon}`}
                className={`card-pokemon ${pokemonType(typePokemon)}`}
            >
                <Card hoverable loading={isLoading} onClick={showModal}>
                    <Image
                        // style={{margin: "0 auto"}}
                        src={`${imagePokemon}`}
                        preview={false}
                    />
                            <h1>{pokemon.name}</h1>
                    <p>{pokemonType(typePokemon)}</p>
                </Card> 
            </Badge.Ribbon>
            <Modal
                title={pokemon.name}
                open={isModalOpen}
                onCancel={handleCancel}
                style={{ top: 20 }}
                footer={null}
            >
                <Image src={`${imagePokemon}`} preview={false} />
                <p>{pokemonType(typePokemon)}</p>
                {typePokemon.map((type: any) => (
                    <Tag
                        className={`card-pokemon 
                        ${
                            type.type.name[0].toUpperCase() +
                            type.type.name.slice(1)
                        }`}
                    >
                        {type.type.name}
                    </Tag>
                ))}
                <div style={{ width: 170 }}>
                    {statsPokemon.map((stat: any) => (
                        <Progress
                            percent={stat.base_stat}
                            format={(percent) => `${stat.stat.name}`}
                        />
                    ))}
                </div>
            </Modal>
        </>
    ) : null;
};

export default PokemonCard;
// export {};
