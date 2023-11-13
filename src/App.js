import { Box } from '@mui/material';
import Home from 'pages/home';
import Thread from 'pages/thread';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import store from 'redux/store';
import './index.css';
import { Helmet } from 'react-helmet';

dayjs.extend(relativeTime);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/thread',
    element: <Thread />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Helmet>
        <title>Reddit</title>
      </Helmet>
      <Box px={24}>
        <RouterProvider router={router} />
      </Box>
    </Provider>
  );
}

export default App;
