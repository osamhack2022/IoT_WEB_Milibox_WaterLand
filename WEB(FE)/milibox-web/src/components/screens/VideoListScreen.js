import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

const VideoListScreen = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>국방 블랙박스</Typography>
          <Typography sx={{ mr: 5 }}>노우준 님</Typography>
          <Button color="inherit">로그아웃</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: 300, flexShrink: 0 }}>
        <Toolbar />
        <Box sx={{ width: 300, overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemText>블랙박스 영상 목록</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton selected>
                <ListItemText>영상 복호화 신청 목록</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4">블랙박스 영상 목록</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 30,
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoListScreen;
