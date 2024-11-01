import { ElectricBolt, History, Timeline } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar({ ...props }) {


    const navItems = ['Home', 'About', 'Contact'];



    return (


        <div className='w-full bg-slate-600 h-20 flex lg:hidden px-9 py-3 justify-around items-center'>


            <div className='text-3xl text-center flex justify-center p-5'>
                RExLab Eletric
            </div>


            <div className='flex'>

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

            </div>


        </div>


    )
}
