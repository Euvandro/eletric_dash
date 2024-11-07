import { ElectricBolt, History, Timeline, VideocamOutlined } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar({ ...props }) {


    const navItems = ['Home', 'About', 'Contact'];



    return (


        <div className='w-full bg-slate-600 h-20 flex lg:hidden px-9 py-3 justify-around items-center'>


            <div className='flex gap-3'>

            <Link to={'/'} className='text-inherit hover:text-slate-300'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Timeline style={{color:"white", fontSize:'32px'}}/>
                </ListItemIcon>
                <span className='text-xl'>Rede Elétrica</span>
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to={'historic'} className='text-inherit hover:text-slate-300'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <History style={{color:"white", fontSize:'32px'}}/>
                  </ListItemIcon>
                  <span className='text-xl'>Histórico</span>
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={'live'} className='text-inherit hover:text-slate-300'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <VideocamOutlined style={{color:"white", fontSize:'32px'}}/>
                  </ListItemIcon>
                  <span className='text-xl'>Laboratório</span>
                </ListItemButton>
              </ListItem>
            </Link>

            </div>


        </div>


    )
}
