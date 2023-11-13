import { Box, Chip, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward, ChatBubbleOutline, MoreHoriz, OpenInFullOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';

import { CardWrapper, CompactVoteWrapper, FooterIconWrapper, VoteButton } from '../styles';
import { formatCountNumber } from 'utils/text';

const ThreadCompact = ({ data, cardContent, setExpandPost, expandPost, upVote, downVote, redirectThread }) => {
  return (
    <CardWrapper variant={'compact'}>
      <Box width="100%">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="start">
            <Box display="flex" alignItems="start" textAlign="center">
              <CompactVoteWrapper>
                <VoteButton onClick={upVote}>
                  <ArrowUpward
                    sx={{
                      ...(data.likes && {
                        color: 'green',
                      }),
                    }}
                  />
                </VoteButton>
                <Typography width="25px" variant="caption">
                  {formatCountNumber(data.ups)}
                </Typography>
                <VoteButton onClick={downVote}>
                  <ArrowDownward
                    sx={{
                      ...(data.hates && {
                        color: 'red',
                      }),
                    }}
                  />
                </VoteButton>
              </CompactVoteWrapper>{' '}
              <FooterIconWrapper sx={{ mt: 0, pt: '3px', pl: '8px' }} onClick={() => setExpandPost(!expandPost)}>
                <OpenInFullOutlined sx={{ width: '16px', marginRight: 1, transform: 'rotate(90deg)' }} />
              </FooterIconWrapper>
            </Box>
            <Box
              onClick={redirectThread}
              width="100%"
              sx={{
                padding: '3px 0',
                cursor: 'pointer',
              }}>
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
          </Box>
          <Box display="flex" alignItems="center">
            <FooterIconWrapper onClick={redirectThread}>
              <ChatBubbleOutline sx={{ width: '16px', marginRight: 1 }} />
              <Typography variant="caption" fontWeight="bold">
                {formatCountNumber(data.num_comments)}
              </Typography>
            </FooterIconWrapper>
            <FooterIconWrapper>
              <MoreHoriz sx={{ width: '20px', marginRight: 1 }} />
            </FooterIconWrapper>
          </Box>
        </Box>
        {expandPost && <Box sx={{ p: 1 }}>{cardContent}</Box>}
      </Box>
    </CardWrapper>
  );
};

export default ThreadCompact;
