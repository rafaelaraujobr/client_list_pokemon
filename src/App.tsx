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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
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
