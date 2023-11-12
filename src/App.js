import { Box } from '@mui/material';
import Home from 'pages/home';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import store from 'redux/store';
import './index.css';

dayjs.extend(relativeTime);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <div>essss</div>,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Box px={24}>
        <RouterProvider router={router} />
      </Box>
    </Provider>
  );
}

export default App;
