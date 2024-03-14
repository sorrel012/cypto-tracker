import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory, fetchCoinTickers } from '../util/api';
import styled from 'styled-components';
import { IPriceData } from './Coin';
import { IHistorical } from './Chart';

const PriceBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
  margin-top: 40px;
`;

const Tab = styled.span`
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  padding: 20px 30px 15px;
  font-size: x-large;
`;

function Price() {
  const coinId = useOutletContext<string>();

  const { data, isLoading } = useQuery<IPriceData>({
    queryKey: ['priceInfo', coinId],
    queryFn: () => fetchCoinTickers(coinId!),
    refetchInterval: 10000 * 100000000000,
    // refetchInterval: 10000 * 10000,
  });

  const { data: historyData, isLoading: isHistoryLoading } = useQuery<
    IHistorical[]
  >({
    queryKey: ['ohlcv', coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: 24 * 60 * 60 * 1000,
  });

  const yesterdayPrice = historyData
    ? Number(historyData[historyData.length - 1].close)
    : 0;
  const todayPrice = data ? Number(data.quotes.USD.price) : 0;

  const percent = Number(data?.quotes.USD.percent_change_24h);
  const currency = todayPrice - yesterdayPrice;

  return (
    <div>
      {isLoading || isHistoryLoading ? (
        'Loading price...'
      ) : (
        <PriceBox>
          <Tab
            className={
              percent > 0
                ? 'currency plus'
                : percent < 0
                  ? 'currency minus'
                  : 'currency'
            }
          >
            {currency > 0 ? (
              <span className="material-symbols-outlined plus">add</span>
            ) : currency === 0 ? (
              '-'
            ) : (
              <span className="material-symbols-outlined minus">remove</span>
            )}
            {Math.abs(currency).toFixed(3)}$
          </Tab>
          <Tab className={percent > 0 ? 'plus' : percent < 0 ? 'minus' : ''}>
            {percent}%
          </Tab>
        </PriceBox>
      )}
    </div>
  );
}

export default Price;
