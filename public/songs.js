window.onload = async function () {
  try {
    const response = await fetch('/api/v1/songs')
    const result = await response.json()
    const songs = result.data
    displaySongs(songs)
  } catch (err) {
    console.error(err)
  }
}

function displaySongs (songs) {
  const songsList = document.getElementById('songsList')
  songsList.innerHTML = ''
  songs.forEach(song => {
    const songCard = `
      <div class="song__container">
        <img width="150px" src="${song.image || './imgs/default_image.jpg'}" alt="Album Image">
        <div class="song__info">
          <h2>${song.name}</h2>
          <p>Artist: ${song.artists.join(', ')}</p>
          <p>Album: ${song.album}</p>
          <p>ID: ${song.customId}</p>
          ${song.preview_url ? `<a href="${song.preview_url}" class="preview__btn" target="_blank">Preview</a>` : '<p>No preview available</p>'}
        </div>
      </div>
      `
    songsList.innerHTML += songCard
  })
}

const songIdBtn = document.querySelector('.song__btn')
songIdBtn.addEventListener('click', () => {
  const songId = document.getElementById('idSongInput').value
  fetchSongById(songId)
})

async function fetchSongById (songId) {
  try {
    const response = await fetch(`/api/v1/songs/${songId}`)
    if (response.ok) {
      const result = await response.json()
      displaySong(result.data)
    } else {
      alert('No se encontró ninguna canción con ese ID.')
    }
  } catch (err) {
    console.error('Error fetching song by ID:', err)
  }
}

function displaySong (song) {
  const songContainer = document.querySelector('.main__container')
  songContainer.innerHTML = `
    <div class="song-details">
      <h1>${song.name}</h1>
      <p>Artista(s): ${song.artists.join(', ')}</p>
      <p>Álbum: ${song.album}</p>
      <img src="${song.image}" alt="Portada del álbum">
      <p><a href="${song.preview_url}" target="_blank">Escuchar preview</a></p>
    </div>
    `
}
