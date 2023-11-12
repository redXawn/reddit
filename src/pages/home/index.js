import { Box, Button, Grid, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import { useLoading } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setForumList } from 'redux/reducers/forum';
import { capitalizeFirstLetter } from 'utils/text';
import ThreadCard from './components/ThreadCard';

const Home = () => {
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const { forum, before, after } = useSelector((state) => state.forum);

  const [variantCard, setVariantCard] = useState('card');
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const open = Boolean(anchorElMenu);

  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleSetVariant = (variant) => {
    setVariantCard(variant);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const getList = useCallback(
    async (after) => {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}`, {
        params: {
          after,
        },
      });
      dispatch(setForumList(data.data));
      setLoading(false);
    },
    [setLoading, dispatch]
  );

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box>Hot</Box>
        <Box>
          <Button sx={{ textTransform: 'unset' }} onClick={handleClickMenu}>
            {capitalizeFirstLetter(variantCard)}
          </Button>
          <Menu anchorEl={anchorElMenu} open={open} onClose={handleCloseMenu}>
            <MenuItem onClick={() => handleSetVariant('card')}>Card</MenuItem>
            <MenuItem onClick={() => handleSetVariant('classic')}>Classic</MenuItem>
            <MenuItem onClick={() => handleSetVariant('compact')}>Compact</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box>
        {forum.map((item, index) => {
          return <ThreadCard key={index} data={item.data} variant={variantCard} />;
        })}
      </Box>
    </>
  );
};

export default Home;
