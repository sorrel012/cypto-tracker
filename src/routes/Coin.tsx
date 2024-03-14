import React from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../util/api';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  padding: 20px 20px 0;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
`;

interface LocationInterface {
  state: {
    name: string;
    rank: number;
  };
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const HomeLayout = styled.div`
  text-align: center;
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as LocationInterface;
  const navigate = useNavigate();

  const { data: info, isLoading: isInfoDataLoading } = useQuery<IInfoData>({
    queryKey: ['coinInfo', coinId],
    queryFn: () => fetchCoinInfo(coinId!),
  });

  const { data: priceInfo, isLoading: isPriceDataLoading } =
    useQuery<IPriceData>({
      queryKey: ['priceInfo', coinId],
      queryFn: () => fetchCoinTickers(coinId!),
      refetchInterval: 10000 * 100000000000,
      // refetchInterval: 10000 * 10000,
    });

  const handleNavigate = () => {
    navigate('../');
  };

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : isInfoDataLoading || isPriceDataLoading
              ? 'Loading..'
              : info?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name
            ? state.name
            : isInfoDataLoading || isPriceDataLoading
              ? 'Loading..'
              : info?.name}
        </Title>
      </Header>
      {isInfoDataLoading || isPriceDataLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${priceInfo?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <NavLink
              to="chart"
              className={({ isActive }) => (isActive ? 'tab isActive' : 'tab')}
              end
            >
              Chart
            </NavLink>
            <NavLink
              to="price"
              className={({ isActive }) => (isActive ? 'tab isActive' : 'tab')}
              end
            >
              Price
            </NavLink>
          </Tabs>
          <Outlet context={coinId} />
          <HomeLayout>
            <span
              onClick={handleNavigate}
              className="material-symbols-outlined link-button"
            >
              home
            </span>
          </HomeLayout>
        </>
      )}
    </Container>
  );
}

export default Coin;
