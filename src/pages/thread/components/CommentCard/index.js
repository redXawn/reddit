import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { AccountCircleOutlined, ArrowUpward, ArrowDownward, ChatBubbleOutline, MoreHoriz } from '@mui/icons-material';

import { formatCountNumber } from 'utils/text';
import { FooterIconWrapper, VoteButton } from '../styles';

const CommentCard = ({ data }) => {
  return (
    <>
      <Box position="relative">
        <Box borderLeft="2px solid #ccc" position="absolute" left="11px" top="30px" bottom="0" />
        <Box display="flex" pb={1} mb={1}>
          <Box mr={1}>
            <AccountCircleOutlined />
          </Box>
          <Box pl={0.5}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" fontWeight="600" mr={1}>
                {data.author}
              </Typography>
              <Typography color="gray" variant="caption">
                {dayjs().to(dayjs.unix(data.created))}
              </Typography>
            </Box>
            <Box mt={1} mb={0.5}>
              <Typography variant="body1">{data.body}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box display="flex" alignItems="center" gap={1} mr={1}>
                <VoteButton disabled={data.likes}>
                  <ArrowUpward
                    sx={{
                      ...(data.likes && {
                        color: 'green',
                      }),
                    }}
                  />
                </VoteButton>
                <Typography variant="caption">{formatCountNumber(data.ups)}</Typography>
                <VoteButton disabled={data.hates}>
                  <ArrowDownward
                    sx={{
                      ...(data.hates && {
                        color: 'red',
                      }),
                    }}
                  />
                </VoteButton>
              </Box>
              <FooterIconWrapper>
                <ChatBubbleOutline sx={{ width: '16px', marginRight: 1 }} />
                <Typography variant="caption" fontWeight="bold">
                  Reply
                </Typography>
              </FooterIconWrapper>
              <FooterIconWrapper>
                <Typography variant="caption" fontWeight="bold">
                  Share
                </Typography>
              </FooterIconWrapper>
              <FooterIconWrapper>
                <MoreHoriz sx={{ width: '20px', marginRight: 1 }} />
              </FooterIconWrapper>
            </Box>
          </Box>
        </Box>
        <Box ml={3}>
          {data?.replies?.data?.children?.length > 0 && (
            <Box>
              {data?.replies?.data?.children?.map((reply, index) => (
                <CommentCard key={index} data={reply.data} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CommentCard;
