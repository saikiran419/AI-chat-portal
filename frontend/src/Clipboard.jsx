import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import './Clipboard.css';

const ClipboardCopy = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <Tooltip title={isCopied ? 'Copied!' : 'Copy to clipboard'} placement="top">
      <IconButton onClick={handleCopy} size="small" className="copy-button">
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default ClipboardCopy;
