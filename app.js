const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose')
const songSchema = require('./schema/songSchema.js')
const Song = mongoose.model('song', songSchema, 'songs')

const app = express();
const port = process.env.PORT || 5000;

var mongoDB = 'mongodb+srv://just-dance-api-user:PHwnK20nTNDBKeyk@justdanceapicluster.ifh1i.mongodb.net/just_dance_db?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
  const connector = mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true},)
  .then(res => console.log("Connected to DB"))
  .catch(err => console.log(err))

async function createSong(songObj) {
  var name = songObj.name
  var artist = songObj.artist
  var year = songObj.year
  var mode = songObj.mode
  var game = songObj.game
  var unlimited = songObj.unlimited

  new Song({
    name,
    artist,
    year,
    mode,
    game,
    unlimited,
  }).save()

  return "Document inserted "+name+"\n"
}

async function addMultipleSongs(songs) {
  var inserted = []
  songs.forEach(async (item,index) => {
    inserted.append(await createSong(item)
    .catch(function() {
      return "Error in function createSong"
    }))
  })

  return inserted
}

async function countSongs(criteria) {
  return await Song.countDocuments(criteria)
}

async function findSong(criteria,rand=0) {
  console.log(criteria)
  if (rand != 0) {
    return await Song.findOne(criteria).skip(rand).exec()
  }
  else {
    return await Song.findOne(criteria).exec()
  }
}

async function findRandomSong(criteria) {
  var count = await countSongs(criteria);
  var song_rand = Math.floor(Math.random() * count);
  return await findSong(criteria, song_rand)
}

async function findSongFilter(unlimited) {
  var criteria = {'game': 'Just Dance 2021','unlimited': false}
  if (unlimited == true) {
    var unlimited_rand = Math.floor(Math.random() * 100);
    if (unlimited_rand > 50) {
      criteria = {'unlimited': true}
    }
  }
  return await findRandomSong(criteria) 
}

app.use(express.json());

app.post("/api/get_song", async (request, response) => {
    var unlimited = request.body.unlimited
    response.send(await findSongFilter(unlimited));
});

app.post("/api/add_song", async (request, response) => {
  try {
    var result = await addMultipleSongs(request.body)
    .catch (function () {
      response.status(500).send("Error in function addMultipleSongs");
    })
    response.send(result);
  } catch (error) {
    response.status(500).send("Something bad happened");
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));