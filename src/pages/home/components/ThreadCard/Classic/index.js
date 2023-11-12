import { useNavigate } from 'react-router-dom';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  ChatBubbleOutline,
  Shortcut,
  BookmarkBorder,
  VisibilityOff,
  FlagOutlined,
  OpenInFullOutlined,
} from '@mui/icons-material';
import dayjs from 'dayjs';

import { CardWrapper, FooterIconWrapper, VoteButton } from '../styles';
import { formatCountNumber } from 'utils/text';

const ThreadClassic = ({ data, cardContent, setExpandPost, expandPost, upVote, downVote }) => {
  const navigate = useNavigate();

  return (
    <CardWrapper variant="classic">
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
        <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/thread')} width="100%">
          <Box display="flex" alignItems="center">
            <Typography mr={1}>{data.title}</Typography>
            <Chip size="small" label={data.link_flair_text} />
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Box color="gray">
                <Typography variant="caption" mr={1}>
                  Posted by u/{data.author} {dayjs().to(dayjs.unix(data.created))}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1.5}>
          <FooterIconWrapper onClick={() => setExpandPost(!expandPost)}>
            <OpenInFullOutlined sx={{ width: '16px', marginRight: 1, transform: 'rotate(90deg)' }} />
          </FooterIconWrapper>
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
            <VisibilityOff sx={{ width: '20px', marginRight: 1 }} />
            <Typography variant="caption" fontWeight="bold">
              Hide
            </Typography>
          </FooterIconWrapper>
          <FooterIconWrapper>
            <FlagOutlined sx={{ width: '20px', marginRight: 1 }} />
            <Typography variant="caption" fontWeight="bold">
              Report
            </Typography>
          </FooterIconWrapper>
        </Box>
        {expandPost && <Box>{cardContent}</Box>}
      </Box>
    </CardWrapper>
  );
};

export default ThreadClassic;
