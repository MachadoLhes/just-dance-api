import React from 'react';
import './App.css';
import './general.css'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button'
import ShuffleIcon from '@material-ui/icons/Shuffle';

import { purple } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[400]}
  }
})

function Topbar() {
  return (
    <div className="Topbar">
      <h1>
        Just Dance Shuffle
      </h1>
    </div>
  );
}

function SongBox() {
  return (
    <Grid className="component-margin">
      <Paper>
        <div className="card">
          <h2>I Am The Best (내가 제일 잘 나가)</h2>
          <h3>Just Dance 2020</h3>
          <p>2NE1</p>
          <p>Trio</p>
        </div>
      </Paper>
    </Grid>
  )
}

function SongPicker() {
  const [state, setState] = React.useState({
    unlimited_checkbox: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/get_song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unlimited: true }),
    });
    const body = await response.text();

    console.log(body)
    
    this.setState({ responseToPost: body });
  };

  return (
    <div className="SongPicker component-margin">
      <form onSubmit={handleSubmit}>
        <div>
          <FormControlLabel
            control={<Checkbox 
                        checked={state.unlimited_checkbox} 
                        onChange={handleChange} 
                        color='primary'
                        name="unlimited_checkbox" />}
            label="Allow Just Dance Unlimited"
          />
        </div>
        <Button 
          variant='outlined' 
          color='default' 
          background='mediumpurple'
          endIcon={<ShuffleIcon/>}>
            Shuffle
        </Button>
      </form>
    </div>
  );
}

function MainContainer() {
  return (
    <div className='song-wall'>
      <SongBox></SongBox>
      <SongPicker></SongPicker>
    </div>
  )
}

function Footer() {
  return (
    <footer className="Footer">
      <div className="contact-info">
        <p>Author: Rodrigo Machado</p>
      </div>
    </footer> 
  )
}

function App() {
  return(
    <ThemeProvider theme={theme}>
      <div>
        <Topbar />
        <MainContainer />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App;
