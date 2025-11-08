import React from 'react';
import { Paper, ListItem, ListItemText, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import CodeBlock from './CodeBlock';
import './Message.css';

const Message = ({ msg, index }) => {
  const { role, content, timestamp } = msg;
  const isUser = role === 'user';
  const isCode = content.includes('```');
  const code = isCode ? content.split('```')[1] : '';

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={index}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <ListItem
        className={`message ${isUser ? 'user' : 'assistant'}`}
      >
        {!isUser && (
          <Avatar
            alt="Assistant"
            src="/assistant-avatar.png"
            className="avatar"
          />
        )}
        <Paper
          elevation={3}
          className="message-paper"
        >
          {isCode ? (
            <CodeBlock code={code} />
          ) : (
            <ListItemText
              primary={content}
              secondary={format(new Date(timestamp), 'p')}
              secondaryTypographyProps={{
                className: 'message-timestamp',
              }}
            />
          )}
        </Paper>
        {isUser && (
          <Avatar
            alt="User"
            src="/user-avatar.png"
            className="avatar"
          />
        )}
      </ListItem>
    </motion.div>
  );
};

export default Message;