import { Box, Button, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import { useLoading } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LocalFireDepartment, Star, BarChart } from '@mui/icons-material';

import { setForumList, setCardVariant, setSortForum } from 'redux/reducers/forum';
import { capitalizeFirstLetter } from 'utils/text';
import ThreadCard from './components/ThreadCard';
import { Helmet } from 'react-helmet';

const Home = () => {
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const { forum, after, cardVariant, sort } = useSelector((state) => state.forum);

  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const open = Boolean(anchorElMenu);

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleSetVariant = (variant) => {
    dispatch(setCardVariant(variant));
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const getList = useCallback(
    async (after) => {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/${sort}.json`, {
        params: {
          after,
        },
      });
      dispatch(setForumList(data.data));
      setLoading(false);
    },
    [setLoading, dispatch, sort]
  );

  useEffect(() => {
    if (forum.length === 0) {
      getList();
    }
  }, [getList, forum]);

  const checkActiveSort = useCallback(
    (value) => {
      return sort === value ? 'contained' : 'text';
    },
    [sort]
  );

  return (
    <>
      <Helmet>
        <title>Reddit - Home</title>
      </Helmet>
      <Box display="flex" justifyContent="space-between" my={2}>
        <Box display="flex" gap={1}>
          <Button
            variant={checkActiveSort('hot')}
            onClick={() => dispatch(setSortForum('hot'))}
            startIcon={<LocalFireDepartment />}>
            Hot
          </Button>
          <Button variant={checkActiveSort('new')} onClick={() => dispatch(setSortForum('new'))} startIcon={<Star />}>
            New
          </Button>
          <Button
            variant={checkActiveSort('top')}
            onClick={() => dispatch(setSortForum('top'))}
            startIcon={<BarChart />}>
            Top
          </Button>
        </Box>
        <Box>
          <Button sx={{ textTransform: 'unset' }} onClick={handleClickMenu}>
            {capitalizeFirstLetter(cardVariant)}
          </Button>
          <Menu anchorEl={anchorElMenu} open={open} onClose={handleCloseMenu}>
            <MenuItem onClick={() => handleSetVariant('card')}>Card</MenuItem>
            <MenuItem onClick={() => handleSetVariant('classic')}>Classic</MenuItem>
            <MenuItem onClick={() => handleSetVariant('compact')}>Compact</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box>
        <InfiniteScroll dataLength={forum.length} next={() => getList(after)} hasMore={!!after}>
          {forum.map((item, index) => {
            return <ThreadCard key={index} index={index} data={item.data} variant={cardVariant} />;
          })}
        </InfiniteScroll>
      </Box>
    </>
  );
};

export default Home;
