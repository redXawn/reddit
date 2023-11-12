import { useNavigate } from 'react-router-dom';
import { Box, Chip, Typography } from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  ChatBubbleOutline,
  Shortcut,
  BookmarkBorder,
  MoreHoriz,
  VisibilityOff,
  FlagOutlined,
  OpenInFullOutlined,
} from '@mui/icons-material';
import dayjs from 'dayjs';

import { CardWrapper, CompactVoteWrapper, FooterIconWrapper } from './styles';
import { useMemo, useState } from 'react';
import { formatCountNumber } from 'utils/text';

const ThreadCard = ({ data, variant }) => {
  const navigate = useNavigate();
  const [expandPost, setExpandPost] = useState(false);

  const isCard = variant === 'card';
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

    return null;
  };

  const renderPostDetail = () => {
    if (isCard) {
      return (
        <Box onClick={() => navigate('/thread')} width="100%">
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

          {isCard && renderContent()}
        </Box>
      );
    } else if (isClassic) {
      return (
        <Box display="flex" alignItems="start">
          <Box onClick={() => navigate('/thread')} width="100%">
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
      );
    } else if (isCompact) {
      return (
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="start">
            <Box display="flex" alignItems="start">
              <CompactVoteWrapper>
                <ArrowUpward sx={{ cursor: 'pointer' }} />
                <Typography variant="caption">{formatCountNumber(data.ups)}</Typography>
                <ArrowDownward sx={{ cursor: 'pointer' }} />
              </CompactVoteWrapper>{' '}
              <FooterIconWrapper sx={{ mt: 0, pt: '3px', pl: '8px' }} onClick={() => setExpandPost(!expandPost)}>
                <OpenInFullOutlined sx={{ width: '16px', marginRight: 1, transform: 'rotate(90deg)' }} />
              </FooterIconWrapper>
            </Box>
            <Box
              onClick={() => navigate('/thread')}
              width="100%"
              sx={{
                ...(isCompact && {
                  padding: '3px 0',
                }),
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
            <FooterIconWrapper>
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
      );
    }
  };

  return (
    <CardWrapper variant={variant}>
      {!isCompact && (
        <Box display="flex" flexDirection="column" alignItems="center" gap={1} mr={1}>
          <ArrowUpward sx={{ cursor: 'pointer' }} />
          <Typography variant="caption">{formatCountNumber(data.ups)}</Typography>
          <ArrowDownward sx={{ cursor: 'pointer' }} />
        </Box>
      )}
      <Box cursor="pointer" width="100%">
        {renderPostDetail()}
        {(isClassic || isCard) && (
          <Box display="flex" alignItems="center" gap={1.5}>
            {isClassic && (
              <FooterIconWrapper onClick={() => setExpandPost(!expandPost)}>
                <OpenInFullOutlined sx={{ width: '16px', marginRight: 1, transform: 'rotate(90deg)' }} />
              </FooterIconWrapper>
            )}
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
            {isClassic && (
              <>
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
              </>
            )}
            {isCard && (
              <FooterIconWrapper>
                <MoreHoriz sx={{ width: '20px', marginRight: 1 }} />
              </FooterIconWrapper>
            )}
          </Box>
        )}
        {(isClassic || isCompact) && expandPost && <Box sx={{ ...(isCompact && { p: 1 }) }}>{renderContent()}</Box>}
      </Box>
    </CardWrapper>
  );
};

export default ThreadCard;
