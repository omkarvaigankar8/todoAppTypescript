import React from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import './header.scss'
const Header = () => {
	let navigate = useNavigate();
	let location=useLocation();
  return (
    <header>
    <Grid container alignContent={'center'} justifyContent={'space-between'} margin={'0 auto'} maxWidth={'98%'} padding={'20px 0px'}>
        <Grid item>
            <Button onClick={()=>{
                navigate('../');
            }}><Typography variant='h1' fontSize={40} fontWeight={700}>
                Post Feed
            </Typography>
            </Button>
        </Grid>
        <Grid item>
            <Button
            startIcon={<HistoryEduIcon />}
            variant='contained'
            size='large'
            color='primary'
            disabled={location.pathname ==='/new-post'?true:false}
            onClick={()=>{
                navigate('./new-post')
            }}
            >Create a New Post</Button>
            
        </Grid>
    </Grid>
    </header>
  )
}

export default Header