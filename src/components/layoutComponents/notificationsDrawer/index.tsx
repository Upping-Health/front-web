import { Check, Close } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SwipeableDrawer,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import React from 'react'

const NotificationDrawer: React.FC<{
  open: boolean
  onClose: () => void
  onOpen: () => void
}> = ({ open, onClose, onOpen }) => {
  const [tab, setTab] = React.useState(0)

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{ sx: { width: 360 } }}
    ></SwipeableDrawer>
  )
}

export default NotificationDrawer
