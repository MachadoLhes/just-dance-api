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

class Topbar extends React.Component {
  render() {
    return (
      <div className="Topbar">
        <h1>
          Just Dance Shuffle
        </h1>
      </div>
    );
  }
}

class SongPicker extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      unlimited_checkbox: true,
      song: {
        name: null,
        artist: null,
        mode: null,
        game: null 
      }
    };
  }
  
  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  handleSubmit = async e => {
    const response = await fetch('/api/get_song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unlimited: this.state.unlimited_checkbox }),
    });
    const body = await response.json();
    console.log(typeof(body))       
    this.setState({ 
      song: {
        name: body['name'],
        artist: body['artist'],
        mode: body['mode'],
        game: body['game'] 
      }
    })     
    console.log(this.state.song)        
  };

  componentDidMount() { this.handleSubmit() }

  render() {  
    const hasSong = this.state.song.name
    let songBox;

    if (hasSong != null) {
      songBox = <div className="card">
                  <h2>{this.state.song.name}</h2>
                  <h3>{this.state.song.game}</h3>
                  <p>{this.state.song.artist}</p>
                  <p>{this.state.song.mode}</p>
                </div>
    } else {
      songBox = <div className="card">
                  <h2>Click the 'Shuffle' button to pick a random song</h2>
                </div>
    }

    return (
      <div className='song-wall'>
        <Grid className="component-margin">
          <Paper>
            <div className="card">
              <h2>{this.state.song.name}</h2>
              <h3>{this.state.song.game}</h3>
              <p>{this.state.song.artist}</p>
              <p>{this.state.song.mode}</p>
            </div>
          </Paper>
        </Grid>
        <div className="SongPicker component-margin">
          <form onSubmit={this.handleSubmit}>
            <div>
              <FormControlLabel
                control={<Checkbox 
                            checked={this.state.unlimited_checkbox} 
                            onChange={this.handleChange} 
                            color='primary'
                            name="unlimited_checkbox" />}
                label="Allow Just Dance Unlimited"
              />
            </div>
            <Button 
              variant='outlined' 
              color='default' 
              background='mediumpurple'
              endIcon={<ShuffleIcon/>}
              onClick={this.handleSubmit}
              >
                Shuffle
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <div className="contact-info">
          <p>Author: Rodrigo Machado</p>
        </div>
      </footer> 
    )
  }
}

class App extends React.Component {
  render() {
    return(
      <ThemeProvider theme={theme}>
        <div>
          <Topbar />
          <SongPicker />
          <Footer />
        </div>
      </ThemeProvider>
    )
  }
}

export default App;
