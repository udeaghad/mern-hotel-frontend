import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const Message = () => {
  const [open, setOpen] = useState(true);

  const {successMsg, errorMsg} = useSelector((state) => state.msg)

  return (
    <>
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
              {successMsg &&
              <Alert
              action={(
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                  variant="filled" 
                  severity="success"
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
            )}
              sx={{ mb: 2 }}
            >
              {successMsg}
            </Alert>
              }

{errorMsg &&
              <Alert
              action={(
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                variant="filled" 
                severity="error"
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
            )}
              sx={{ mb: 2 }}
            >
              {errorMsg}
            </Alert>
              }
              
            </Collapse>
          </Box>
        

    </>
  )

}

export default Message;