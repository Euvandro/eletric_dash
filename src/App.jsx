import './App.css'

import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Historic from './Pages/Historic';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { GraphicEqOutlined, History, Timeline } from '@mui/icons-material';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <Navbar/>
      <div className="flex">
      {/* grid grid-cols-8 xl:grid-cols-10 */}
      
        <Box className={"bg-slate-600 min-h-screen col-span-1 lg:block hidden"} role="presentation">
          <List>


            <div className='text-3xl text-center flex justify-center p-5'>
              RExLab Eletric
            </div>


            <Link to={'/'} className='text-inherit hover:text-slate-300'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Timeline />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to={'historic'} className='text-inherit hover:text-slate-300'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <ListItemText primary={"Histórico"} />
                </ListItemButton>
              </ListItem>
            </Link>

          </List>
        </Box>

        <div className="container w-full m-auto">
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
