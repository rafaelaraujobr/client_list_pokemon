import { FC, useEffect, useState } from "react";
import { Input, List } from "antd";
// import type { PaginationProps } from "antd";
import { getPokemonAll } from "../services/pokemon.services";
// import {
//     EditOutlined,
//     EllipsisOutlined,
//     SettingOutlined,
// } from "@ant-design/icons";
// import Meta from "antd/es/card/Meta";
import PokemonCard from "./PokemonCard";

interface DataType {
    name: string;
    url: string;
}

const PokemonList: FC = () => {
    const [pokemons, setPokemons] = useState<DataType[]>([]);
    const [pokemonsFilter, setPokemonsFilter] = useState<DataType[]>([]);
    // const [totalPokemon, setTotalPokemon] = useState(1154);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(18);

    // const onChange: PaginationProps["onChange"] = (page, perPage) => {
    //     setCurrentPage(page * perPage - perPage);
    //     setPerPage(perPage);
    // };

    useEffect(() => {
        const getAll = async () => {
            setIsLoading(true);
            try {
                const { data, status } = await getPokemonAll(1000);
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
        getAll();
    }, []);

    const filterPokemon = (e: any) => {
        const val = e.target.value;
        if (val === "") {
            setPokemonsFilter(pokemons);
            return;
        }

        setPokemonsFilter(() => {
            // const needle = val.toLowerCase();
            return pokemons.filter((pokemon: DataType) =>
                pokemon.name.toLowerCase().includes(val.toLowerCase())
            );
        });
    };

    return (
        <>
            <Input placeholder="Buscar" onChange={filterPokemon} />
            <List
                grid={{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 5, xxl: 6 }}
                dataSource={pokemonsFilter}
                renderItem={(item: DataType, index) => (
                    <List.Item>
                        <PokemonCard pokemon={item} />
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
