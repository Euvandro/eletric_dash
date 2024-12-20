import './App.css'

import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Historic from './Pages/Historic';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { GraphicEqOutlined, History, Timeline, VideocamOutlined } from '@mui/icons-material';
import Navbar from './components/Navbar';
import Live from './Pages/Live';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Labs from './Pages/Labs';


function App() {

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* grid grid-cols-8 xl:grid-cols-10 */}

        <Box className={"bg-slate-600 min-h-screen col-span-1 lg:block hidden"} role="presentation">
          <List>


            <div className='text-3xl text-center flex justify-center p-5'>
              RExLab
            </div>


            <Link to={'/'} className='text-inherit hover:text-slate-300'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Timeline style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Rede Elétrica"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={'historic'} className='text-inherit hover:text-slate-300'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <History style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Histórico"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={'live'} className='text-inherit hover:text-slate-300'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <VideocamOutlined style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Laboratório"} />
                </ListItemButton>
              </ListItem>
            </Link>

          </List>
        </Box>

        <div className="container w-full m-auto">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/historic" element={<Historic />} />
              <Route path="/live" element={<Live />} />
              <Route path="/labs" element={<Labs />} />
            </Routes>
          </LocalizationProvider>
        </div>
      </div>
    </>
  )
}

export default App
