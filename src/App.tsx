import { FC } from "react";
import "antd/dist/reset.css";
import "./custom.sass";

import { ConfigProvider } from "antd";
import { Layout, theme } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

import PokemonList from "./shared/components/PokemonList";

const { Header, Content, Footer } = Layout;

export const App: FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <ConfigProvider locale={ptBR}>
            <Layout>
                <Header>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                            alt="pokeapi"
                            style={{ height: 80 }}
                        />
                    </div>
                </Header>
                <Content style={{ margin: "16px" }}>
                    <div
                        className="site-layout-content"
                        style={{
                            padding: 24,
                            minHeight: 360,
                            maxWidth: 1200,
                            margin: "0 auto",
                            borderRadius: 8,
                            background: colorBgContainer,
                        }}
                    >
                        <PokemonList />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Created by Rafael Araujo
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};
