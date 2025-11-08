// This is a test comment to force re-evaluation
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Paper } from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing';
import '/src/ListeningPopup.css';

const ListeningPopup = ({ isListening }) => {
  return (
    <AnimatePresence>
      {isListening && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="listening-popup-container"
        >
          <Paper elevation={6} className="listening-popup-paper">
            <Box className="listening-popup-content">
              <HearingIcon className="listening-mic-icon" />
              <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                Listening...
              </Typography>
              {/* Placeholder for 3D illustration */}
              <Box className="listening-illustration-placeholder" sx={{ mt: 2 }}>
                {/* In a real app, you'd put your 3D illustration here */}
                <Typography variant="h3">👂</Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ListeningPopup;