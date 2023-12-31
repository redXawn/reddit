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

const ThreadCard = ({ data, cardContent, upVote, downVote, redirectThread }) => {
  return (
    <CardWrapper variant="card">
      <Box display="flex" flexDirection="column" alignItems="center" gap={1} mr={1}>
        <VoteButton onClick={upVote}>
          <ArrowUpward
            sx={{
              ...(data.likes && {
                color: 'green',
              }),
            }}
          />
        </VoteButton>
        <Typography variant="caption">{formatCountNumber(data.ups)}</Typography>
        <VoteButton onClick={downVote}>
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
        <Box sx={{ cursor: 'pointer' }} onClick={redirectThread} width="100%">
          <Box display="flex" alignItems="center">
            <Box>
              <Box color="gray">
                <Typography variant="caption" mr={1}>
                  Posted by u/{data.author} {dayjs().to(dayjs.unix(data.created))}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography mr={1}>{data.title}</Typography>
                <Chip size="small" label={data.link_flair_text} />
              </Box>
            </Box>
          </Box>

          {cardContent}
        </Box>
        <Box display="flex" alignItems="center" gap={1.5}>
          <FooterIconWrapper onClick={redirectThread}>
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
