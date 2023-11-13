import { Box, styled, IconButton } from '@mui/material';

export const CardWrapper = styled(Box)((props) => ({
  padding: '12px 24px 4px 24px',
  borderRadius: 6,
  marginBottom: 24,
  border: '1px solid rgba(26,26,27,0.1)',
  display: 'flex',
  overflowX: 'hidden',
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
