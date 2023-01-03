import { FC, useInsertionEffect, useState } from "react";
import { Pagination, List } from "antd";
import type { PaginationProps } from "antd";
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
    const [totalPokemon, setTotalPokemon] = useState(1154);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const onChange: PaginationProps["onChange"] = (page, perPage) => {
        setCurrentPage(page * perPage - perPage);
        setPerPage(perPage);
    };

    // let rows: DataType[] = [];

    useInsertionEffect(() => {
        const getAll = async () => {
            setIsLoading(true);
            try {
                const { data, status } = await getPokemonAll(
                    perPage,
                    currentPage
                );
                if (status === 200) {
                    setTotalPokemon(data.count);
                    setPokemons(data.results);
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
    }, [currentPage, perPage]);

    return (
        <>
            <List
                grid={{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 5, xxl: 5 }}
                dataSource={pokemons}
                renderItem={(item: DataType) => (
                    <List.Item>
                        <PokemonCard pokemon={item} key={item.name}/>
                        {/* <Card
                            cover={
                                <img
                                    alt={item.name}
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Skeleton loading={isLoading} avatar active>
                                <Meta
                                    avatar={
                                        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" />
                                    }
                                    title={item.name}
                                    // description={item.url}
                                />
                            </Skeleton>
                        </Card> */}
                    </List.Item>
                )}
            />
            <Pagination
                defaultCurrent={currentPage}
                defaultPageSize={perPage}
                total={totalPokemon}
                onChange={onChange}
            />
        </>
    );
};

export default PokemonList;
