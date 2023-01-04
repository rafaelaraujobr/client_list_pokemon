import { useEffect, useState } from "react";
import React from "react";
import {
    Badge,
    Card,
    Col,
    Image,
    Progress,
    Row,
    Statistic,
    Tag,
} from "antd";

import { getPokemonByName } from "../services/pokemon.services";
import { DashboardOutlined, ColumnHeightOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
// import axios from "axios";
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
    const [weightPokemon, setWeightPokemon] = useState<number>(0);
    const [heightPokemon, setHeightPokemon] = useState<number>(0);
    const [abilitiesPokemon, setAbilitiesPokemon] = useState<any[]>([]);

    // const pad = (number: number, length: number) => {
    //     let str = "" + number;
    //     while (str.length < length) str = "0" + str;
    //     return str;
    // };

    // const getPokemonImageUrl = async (id: number, url: string) => {
    //     try {
    //         await axios.get(`/thumbnails-compressed/${pad(id, 3)}.png`);
    //         return `/thumbnails-compressed/${pad(id, 3)}.png`;
    //     } catch (error) {
    //         console.log(error);
    //         return url;
    //     }
    // };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const parseAbilities = (abilities: any) => {
        return abilities.map((ability: any) => {
            return (
                ability.ability.name[0].toUpperCase() +
                ability.ability.name.slice(1)
            );
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const pokemonType = (typePokemon: any) => {
        let [type] = typePokemon;
        return type
            ? typePokemon.map(
                  (type: any) =>
                      type.type.name[0].toUpperCase() + type.type.name.slice(1)
              )[0]
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
                    setImagePokemon(data.sprites.front_default);
                    setWeightPokemon(data.weight);
                    setHeightPokemon(data.height);
                    setAbilitiesPokemon(parseAbilities(data.abilities));

                    // setImagePokemon(
                    //     await getPokemonImageUrl(
                    //         data.id,
                    //         data.sprites.front_default
                    //     )
                    // );
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
                <Card hoverable loading={isLoading} onClick={showModal}  className={`card-pokemon`}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Image src={`${imagePokemon}`} preview={false} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h1>{pokemon.name}</h1>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {typePokemon.map((type: any) => (
                            <Tag
                                className={`card-pokemon  type-pokemon
                        ${
                            type.type.name[0].toUpperCase() +
                            type.type.name.slice(1)
                        }`}
                            >
                                {type.type.name}
                            </Tag>
                        ))}
                    </div>
                </Card>
            </Badge.Ribbon>
            <Modal
                title={pokemon.name}
                open={isModalOpen}
                onCancel={handleCancel}
                style={{ top: 20 }}
                footer={null}
                width={800}
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Image src={`${imagePokemon}`} width={300} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3>#{idPokemon}</h3>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>{pokemon.name}</h1>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {typePokemon.map((type: any) => (
                        <Tag
                            className={`card-pokemon type-pokemon
                        ${
                            type.type.name[0].toUpperCase() +
                            type.type.name.slice(1)
                        }`}
                        >
                            {type.type.name}
                        </Tag>
                    ))}
                </div>
                <Row
                    style={{ marginTop: 20 }}
                    gutter={{ xs: 12, sm: 16, md: 24, lg: 32 }}
                >
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <Statistic
                                    title="Peso"
                                    prefix={<DashboardOutlined />}
                                    value={weightPokemon}
                                    decimalSeparator="."
                                    formatter={(value) => `${+value / 10} kg`}
                                />
                                <Statistic
                                    title="Altura"
                                    prefix={<ColumnHeightOutlined />}
                                    value={heightPokemon}
                                    decimalSeparator="."
                                    formatter={(value) => `${+value / 10} m`}
                                />
                                 <div style={{ marginBottom: "10px", color: "rgba(0, 0, 0, 0.45)", fontSize: "14px" }}>
                                   Habilidades
                                </div>
                                {abilitiesPokemon.map((item: any) => (
                                    <Tag style={{ padding: "0.25em 0.5em" }}>
                                        {item}
                                    </Tag>
                                ))}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <div style={{ marginBottom: "10px", color: "rgba(0, 0, 0, 0.45)", fontSize: "14px" }}>
                           Statisticas
                        </div>
                        <div style={{ width: 170 }}>
                            {statsPokemon.map((stat: any) => (
                                <Progress
                                    percent={stat.base_stat}
                                    format={(value) =>
                                        `${
                                            stat.stat.name
                                                ? stat.stat.name ===
                                                  "special-attack"
                                                    ? "Sp. Atk"
                                                    : stat.stat.name ===
                                                      "special-defense"
                                                    ? "Sp. Def"
                                                    : stat.stat.name[0].toUpperCase() +
                                                      stat.stat.name.slice(1)
                                                : null
                                        } ${value}`
                                    }
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    ) : null;
};

export default PokemonCard;
// export {};
