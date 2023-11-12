import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { setVote } from 'redux/reducers/forum';
import Card from './Card';
import Classic from './Classic';
import Compact from './Compact';

const ThreadCard = ({ data, variant }) => {
  const dispatch = useDispatch();

  const [expandPost, setExpandPost] = useState(false);

  const isClassic = variant === 'classic';
  const isCompact = variant === 'compact';

  const checkIsImageUrl = useMemo(() => {
    if (data.url.split('/i.').length > 1) {
      return true;
    }
    return false;
  }, [data.url]);

  const renderContent = () => {
    if (checkIsImageUrl) {
      return (
        <Box my={1}>
          <img
            style={{
              width: '100%',
              maxHeight: '500px',
              ...((isClassic || isCompact) && { maxWidth: '600px', display: 'flex', margin: 'auto' }),
            }}
            src={data.url}
            alt={data.url}
          />
        </Box>
      );
    } else if (data.selftext) {
      return (
        <Box my={1}>
          <Typography>{data.selftext}</Typography>
        </Box>
      );
    } else {
      return (
        <Box my={1}>
          <Typography>www.reddit.com</Typography>
        </Box>
      );
    }
  };

  const setVoteThread = (value) => {
    const payload = {
      type: value,
      id: data.id,
    };
    console.log(payload);
    dispatch(setVote(payload));
  };

  if (variant === 'card') {
    return (
      <Card
        data={data}
        cardContent={renderContent()}
        upVote={() => setVoteThread('up')}
        downVote={() => setVoteThread('down')}
      />
    );
  } else if (variant === 'classic') {
    return (
      <Classic
        data={data}
        cardContent={renderContent()}
        setExpandPost={setExpandPost}
        expandPost={expandPost}
        setVote={() => setVoteThread('up')}
        downVote={() => setVoteThread('down')}
      />
    );
  } else {
    return (
      <Compact
        data={data}
        cardContent={renderContent()}
        setExpandPost={setExpandPost}
        expandPost={expandPost}
        upVote={() => setVoteThread('up')}
        downVote={() => setVoteThread('down')}
      />
    );
  }
};

export default ThreadCard;
