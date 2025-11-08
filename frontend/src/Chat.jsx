import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Popover,
} from '@mui/material';
import { Send as SendIcon, Delete as DeleteIcon, InsertEmoticon, AttachFile, Mic } from '@mui/icons-material';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import Message from './Message';
import TypingAnimation from './TypingAnimation.jsx';
import './BackgroundAnimation.css';
import './Chat.css';
import EmojiPicker from 'emoji-picker-react';
import ListeningPopup from './ListeningPopup';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7f5af0',
    },
    secondary: {
      main: '#2cb67d',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    error: {
      main: '#ff4a4a',
    },
    info: {
      main: '#00bbf9',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h5: {
      fontWeight: 700,
    },
    body2: {
      fontSize: '0.8rem',
    },
  },
});

function Chat() {
  const [msg, setMsg] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const speechRecognitionRef = useRef(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setHistory([
      {
        role: 'assistant',
        content: 'Hi there! How can I help you today?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('Selected file:', file.name);
      // In a real application, you would now upload this file
      // and potentially send a message with a reference to it.
      setMsg((prevMsg) => prevMsg + ` [File: ${file.name}]`);
    }
  };

  const sendMessage = async () => {
    if (msg.trim() === '') return;

    const userMessage = { role: 'user', content: msg, timestamp: new Date() };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setMsg('');
    setLoading(true);
    setIsTyping(true);

    try {
      const res = await axios.post('/api/chat/', {
        role: userMessage.role,
        content: String(userMessage.content),
      });
      const aiMessage = { ...res.data, timestamp: new Date() };
      setHistory((prevHistory) => [...prevHistory, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: `Sorry, something went wrong. Please try again. Error: ${error.message}`,
        timestamp: new Date(),
      };
      setHistory((prevHistory) => [...prevHistory, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history, loading, isTyping]);

  const handleClearChat = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmClearChat = () => {
    setHistory([
      {
        role: 'assistant',
        content: 'Hi there! How can I help you today?',
        timestamp: new Date(),
      },
    ]);
    handleClose();
  };

  const handleAttachFileClick = () => {
    fileInputRef.current.click();
  };

  const handleInsertEmojiClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenEmojiPicker(true);
  };

  const handleCloseEmojiPicker = () => {
    setAnchorEl(null);
    setOpenEmojiPicker(false);
  };

  const onEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
    setOpenEmojiPicker(false);
  };

  const handleVoiceInputClick = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser. Please use Chrome.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    speechRecognitionRef.current = new SpeechRecognition();
    speechRecognitionRef.current.continuous = false;
    speechRecognitionRef.current.interimResults = false;
    speechRecognitionRef.current.lang = 'en-US';

    speechRecognitionRef.current.onstart = () => {
      setIsListening(true);
      console.log('Speech recognition started');
    };

    speechRecognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMsg((prevMsg) => prevMsg + transcript);
      console.log('Speech recognized:', transcript);
    };

    speechRecognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    speechRecognitionRef.current.onend = () => {
      setIsListening(false);
      console.log('Speech recognition ended');
    };

    if (isListening) {
      speechRecognitionRef.current.stop();
    } else {
      speechRecognitionRef.current.start();
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Box className="background-animation" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper' }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Sai Kiran's AI Chatbot
            </Typography>
            <IconButton color="inherit" onClick={handleClearChat}>
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Clear chat history?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to clear the chat history? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={confirmClearChat} autoFocus>
              Clear
            </Button>
          </DialogActions>
        </Dialog>

        <Popover
          open={openEmojiPicker}
          anchorEl={anchorEl}
          onClose={handleCloseEmojiPicker}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Popover>
        <Container
          component={Paper}
          elevation={3}
          className="chat-card-3d"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            mt: 2,
            mb: 2,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <List
            ref={chatContainerRef}
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: 2,
            }}
          >
            <AnimatePresence>
              {history.map((m, index) => (
                <Message key={index} msg={m} index={index} />
              ))}
            </AnimatePresence>
            {isTyping && (
              <ListItem sx={{ justifyContent: 'flex-start' }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: '0.75rem 1.25rem',
                    bgcolor: 'secondary.main',
                    color: 'text.primary',
                    borderRadius: '20px 20px 20px 5px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <TypingAnimation />
                </Paper>
              </ListItem>
            )}
          </List>
          <Box sx={{ display: 'flex', p: 2, borderTop: '1px solid', borderColor: 'divider', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  sendMessage();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton sx={{ color: 'error.main' }} aria-label="attach file" onClick={handleAttachFileClick}>
                      <AttachFile />
                    </IconButton>
                    <IconButton sx={{ color: 'secondary.main' }} aria-label="insert emoji" onClick={handleInsertEmojiClick}>
                      <InsertEmoticon />
                    </IconButton>
                    <IconButton
                      sx={{ color: 'info.main' }}
                      aria-label="voice input"
                      onClick={handleVoiceInputClick}
                      className={isListening ? 'mic-listening' : ''}
                    >
                      <Mic />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                ml: 1,
                mr: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '200px',
                  backgroundColor: 'background.paper',
                  '& fieldset': {
                    borderColor: 'text.secondary',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={sendMessage}
              disabled={loading}
              sx={{ ml: 1.5 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Container>
        <ListeningPopup isListening={isListening} />
      </Box>
    </ThemeProvider>
  );
}

export default Chat;