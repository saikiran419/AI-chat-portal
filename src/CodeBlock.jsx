import React, { useState } from 'react';
import { Paper, IconButton, Tooltip } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        my: 2,
      }}
    >
      <SyntaxHighlighter language="javascript" style={a11yDark}>
        {code}
      </SyntaxHighlighter>
      <Tooltip title={isCopied ? 'Copied!' : 'Copy code'}>
        <IconButton
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            color: 'common.white',
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default CodeBlock;
