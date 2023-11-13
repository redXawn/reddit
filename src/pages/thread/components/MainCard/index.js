import { Box, Chip, Typography } from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  ChatBubbleOutline,
  Shortcut,
  BookmarkBorder,
  MoreHoriz,
} from '@mui/icons-material';
import dayjs from 'dayjs';

import { CardWrapper, FooterIconWrapper, VoteButton } from '../styles';
import { formatCountNumber } from 'utils/text';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const ThreadCard = ({ data, cardContent, upVote, downVote, redirectThread }) => {
  const navigate = useNavigate();

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

  return (
    <CardWrapper variant="card">
      <Box display="flex" flexDirection="column" alignItems="center" gap={1} mr={1}>
        <VoteButton disabled={data.likes} onClick={upVote}>
          <ArrowUpward
            sx={{
              ...(data.likes && {
                color: 'green',
              }),
            }}
          />
        </VoteButton>
        <Typography variant="caption">{formatCountNumber(data.ups)}</Typography>
        <VoteButton disabled={data.hates} onClick={downVote}>
          <ArrowDownward
            sx={{
              ...(data.hates && {
                color: 'red',
              }),
            }}
          />
        </VoteButton>
      </Box>
      <Box width="100%">
        <Box width="100%">
          <Box display="flex" alignItems="center">
            <Box>
              <Box>
                <Typography
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                  variant="caption"
                  fontWeight="bold"
                  mr={1}>
                  r/DotA2
                </Typography>
                <Typography color="gray" variant="caption" mr={1}>
                  Posted by u/{data.author} {dayjs().to(dayjs.unix(data.created))}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography mr={1}>{data.title}</Typography>
              </Box>
              <Chip size="small" label={data.link_flair_text} />
            </Box>
          </Box>

          {renderContent()}
        </Box>
        <Box display="flex" alignItems="center" gap={1.5}>
          <FooterIconWrapper>
            <ChatBubbleOutline sx={{ width: '16px', marginRight: 1 }} />
            <Typography variant="caption" fontWeight="bold">
              {formatCountNumber(data.num_comments)} Comment{data.num_comments > 1 && 's'}
            </Typography>
          </FooterIconWrapper>
          <FooterIconWrapper>
            <Shortcut sx={{ width: '20px', marginRight: 1 }} />
            <Typography variant="caption" fontWeight="bold">
              Share
            </Typography>
          </FooterIconWrapper>
          <FooterIconWrapper>
            <BookmarkBorder sx={{ width: '20px', marginRight: 1 }} />
            <Typography variant="caption" fontWeight="bold">
              Save
            </Typography>
          </FooterIconWrapper>
          <FooterIconWrapper>
            <MoreHoriz sx={{ width: '20px', marginRight: 1 }} />
          </FooterIconWrapper>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default ThreadCard;
