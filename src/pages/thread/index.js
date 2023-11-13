import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useLoading } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setThread } from 'redux/reducers/thread';

import MainCard from './components/MainCard';
import CommentCard from './components/CommentCard';

const ThreadPage = () => {
  const { setLoading } = useLoading();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { main, comment } = useSelector((state) => state.thread);

  const paramsId = searchParams.get('id');
  const paramsTitle = searchParams.get('title');

  const [inputComment, setInputComment] = useState('');

  const getThreadDetail = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/${paramsId}/${paramsTitle}.json`);
    dispatch(setThread(data));
    setLoading(false);
  }, [setLoading, dispatch, paramsId, paramsTitle]);

  useEffect(() => {
    if (paramsId && paramsTitle) {
      getThreadDetail();
    } else {
      navigate('/');
    }
  }, [getThreadDetail, paramsId, paramsTitle, navigate]);

  if (!main) {
    return <div>loading...</div>;
  }
  return (
    <Box maxWidth="640px" m="auto" mt={2}>
      <MainCard
        data={main.data}
        cardContent={() => {}}
        upVote={() => {}}
        downVote={() => {}}
        redirectThread={() => {}}
      />
      <Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="What are your thoughts?"
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <Box mt={2} textAlign="right">
          <Button variant="contained" disabled={!inputComment}>
            Comment
          </Button>
        </Box>
      </Box>
      {comment.data.children.map((item, index) => (
        <CommentCard key={index} data={item.data} />
      ))}
    </Box>
  );
};

export default ThreadPage;
