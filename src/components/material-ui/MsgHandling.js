import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { msgAction } from '../../redux/msgHandler/msgReducer';

const Message = () => {
  const dispatch = useDispatch();
  const { successMsg, errorMsg } = useSelector((state) => state.msg);

  const handleClick = () => {
    dispatch(msgAction.resetMsg(null));
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {successMsg
              && (
              <Alert
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleClick}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
            )}
                sx={{ mb: 2 }}
                severity="success"
              >
                {successMsg}
              </Alert>
              )}

        {errorMsg
              && (
              <Alert
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleClick}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
            )}
                sx={{ mb: 2 }}
                severity="error"
              >
                {errorMsg}
              </Alert>
              )}
      </Box>

    </>
  );
};

export default Message;
