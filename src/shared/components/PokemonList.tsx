import { FC, useInsertionEffect, useState } from "react";
import { Pagination, List, Card } from "antd";
import type { PaginationProps } from "antd";
import { getPokemonAll } from "../services/pokemon.services";


interface DataType {
  name: string;
  url: string;
}

const PokemonListTable: FC = () => {
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
        const { data, status } = await getPokemonAll(perPage, currentPage);
        if (status === 200) {
          setTotalPokemon(data.count);
          setPokemons(data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
        setIsLoading(false);
        }, 5000);
      }
    };
    getAll();
  }, [currentPage, perPage]);

  return (
    <>
      <List
        grid={{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 5, xxl: 6 }}
        dataSource={pokemons}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.name} loading={isLoading}>{item.url}</Card>
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

export default PokemonListTable;
