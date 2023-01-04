import { FC, useEffect, useState } from "react";
import { Input, List, Select } from "antd";
// import type { PaginationProps } from "antd";
import { getPokemonAll, getPokemonByType } from "../services/pokemon.services";
import { SearchOutlined } from "@ant-design/icons";
import PokemonCard from "./PokemonCard";

interface DataType {
    name: string;
    url: string;
}

const PokemonList: FC = () => {
    const [pokemons, setPokemons] = useState<DataType[]>([]);
    const [pokemonsFilter, setPokemonsFilter] = useState<DataType[]>([]);
    const [totalPokemon] = useState(1154);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);

    // const onChange: PaginationProps["onChange"] = (page, perPage) => {
    //     setCurrentPage(page * perPage - perPage);
    //     setPerPage(perPage);
    // };
    const getAll = async () => {
        setIsLoading(true);
        try {
            const { data, status } = await getPokemonAll(totalPokemon);
            if (status === 200) {
                setPokemons(data.results);
                setPokemonsFilter(data.results);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };
    useEffect(() => {
        getAll();
    }, []);

    const onFilterPokemon = (e: any) => {
        const val = e.target.value;
        if (val === "") {
            setPokemonsFilter(pokemons);
            return;
        }

        setPokemonsFilter(() => {
            return pokemons.filter((pokemon: DataType) =>
                pokemon.name.toLowerCase().includes(val.toLowerCase())
            );
        });
    };

    const getByType = async (type: string) => {
        setIsLoading(true);
        try {
            const { data, status } = await getPokemonByType(type);
            if (status === 200) {
                const pokemons = data.pokemon.map((item: any) => item.pokemon);
                setPokemons(pokemons);
                setPokemonsFilter(pokemons);
            }
        } catch (error) {
            console.log(error);
            setPokemons([]);
            setPokemonsFilter([]);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    const handleChange = async (value: string) => {
        if (value && value !== "all") await getByType(value);
        else await getAll();
    };

    return (
        <>
            <div>
                <Select
                    style={{ width: 200, marginLeft: 20 }}
                    onChange={handleChange}
                    size="large"
                    allowClear={true}
                    placeholder="Selecione um tipo"
                    options={[
                        {
                            value: "all",
                            label: "Todos",
                        },
                        {
                            value: "grass",
                            label: "Grass",
                        },
                        {
                            value: "dark",
                            label: "Dark",
                        },
                        {
                            value: "dragon",
                            label: "Dragon",
                        },
                        {
                            value: "electric",
                            label: "Electric",
                        },
                        {
                            value: "fairy",
                            label: "Fairy",
                        },
                        {
                            value: "fighting",
                            label: "Fighting",
                        },
                        {
                            value: "fire",
                            label: "Fire",
                        },
                        {
                            value: "flying",
                            label: "Flying",
                        },
                        {
                            value: "ghost",
                            label: "Ghost",
                        },
                        {
                            value: "ground",
                            label: "Ground",
                        },
                        {
                            value: "ice",
                            label: "Ice",
                        },
                        {
                            value: "normal",
                            label: "Normal",
                        },
                        {
                            value: "poison",
                            label: "Poison",
                        },
                        {
                            value: "psychic",
                            label: "Psychic",
                        },
                        {
                            value: "rock",
                            label: "Rock",
                        },
                        {
                            value: "steel",
                            label: "Steel",
                        },
                        {
                            value: "water",
                            label: "Water",
                        },
                    ]}
                />
                <Input
                    placeholder="buscar por nome..."
                    onChange={onFilterPokemon}
                    style={{ width: 300, margin: 25 }}
                    size="large"
                    prefix={<SearchOutlined />}
                />
            </div>
            <List
                grid={{ gutter: 0, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
                dataSource={pokemonsFilter}
                renderItem={(item: DataType, index) => (
                    <List.Item>
                        <PokemonCard pokemon={item.name} />
                    </List.Item>
                )}
                pagination={{
                    onChange: (page, perPage) => {
                        setPerPage(perPage);
                    },
                    pageSize: perPage,
                }}
            />
            {/* <Pagination
                defaultCurrent={currentPage}
                defaultPageSize={perPage}
                total={totalPokemon}
                onChange={onChange}
            /> */}
        </>
    );
};

export default PokemonList;
