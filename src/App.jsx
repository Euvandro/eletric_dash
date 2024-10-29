import './App.css'

import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Historic from './Pages/Historic';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function App() {

  return (
    <>

      <div className="grid grid-cols-8 gap-3">


        <Box className={"bg-slate-600 h-screen col-span-1"} role="presentation">
          <List>


            <div className='text-3xl text-center flex justify-center p-5'>
              RExLab Eletric
            </div>


            <Link to={'/'} className='text-inherit hover:text-slate-300'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to={'historic'} className='text-inherit hover:text-slate-300'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Histórico"} />
                </ListItemButton>
              </ListItem>
            </Link>

          </List>
        </Box>

        <div className="container col-span-7">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/historic" element={<Historic />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
