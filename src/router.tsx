import { createBrowserRouter } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import Price from './routes/Price';
import Chart from './routes/Chart';

const router = createBrowserRouter([
  { path: '/', element: <Coins /> },
  {
    path: '/:coinId',
    element: <Coin />,
    children: [
      {
        path: 'price',
        element: <Price />,
      },
      {
        path: 'chart',
        element: <Chart />,
      },
    ],
  },
]);

export default router;
