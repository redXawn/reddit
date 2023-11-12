import { Box, styled, IconButton } from '@mui/material';

export const CardWrapper = styled(Box)((props) => ({
  padding: '12px 24px 4px 24px',
  borderRadius: 6,
  marginBottom: 24,
  border: '1px solid rgba(26,26,27,0.1)',
  display: 'flex',
  overflowX: 'hidden',
  ':hover': {
    borderColor: 'black',
  },
  ...(props.variant === 'card' && {
    maxWidth: '640px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
  ...(props.variant === 'classic' && {
    margin: 'auto',
    borderRadius: 0,
  }),
  ...(props.variant === 'compact' && {
    margin: 'auto',
    borderRadius: 0,
    padding: 0,
    borderBottomColor: '#EDEFF1',
  }),
}));

export const CompactVoteWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  background: 'rgb(218, 224, 230, 0.5)',
  padding: '15px',
  width: '70px',
  borderRight: '1px solid #EDEFF1',
}));

export const FooterIconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  color: 'gray',
  marginTop: '4px',
  padding: '4px',
  borderRadius: '2px',
  cursor: 'pointer',
  ':hover': {
    background: 'rgba(26,26,27,0.1)',
  },
}));

export const VoteButton = styled(IconButton)(() => ({
  padding: 0,
}));
