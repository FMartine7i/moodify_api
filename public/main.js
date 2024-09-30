const songsContainer = document.querySelector('.songs__container')
const artistsContainer = document.querySelector('.artists__container')
const playlistsContainer = document.querySelector('.playlists__container')
const albumsContainer = document.querySelector('.albums__container')
const containers = [songsContainer, artistsContainer, playlistsContainer, albumsContainer]
const songView = document.querySelector('.song-id__container')
const goBackBtn = document.querySelector('.go-back__btn')
const songIdCard = document.querySelector('.search__card')

document.getElementById('songs').addEventListener('click', () => {
  showContainer(songsContainer)
})
document.getElementById('artists').addEventListener('click', () => {
  showContainer(artistsContainer)
})
document.getElementById('playlists').addEventListener('click', () => {
  showContainer(playlistsContainer)
})
document.getElementById('albums').addEventListener('click', () => {
  showContainer(albumsContainer)
})
document.getElementById('explore').addEventListener('click', () => {
  alert('Explore no tiene una función especificada.')
})
document.getElementById('history').addEventListener('click', () => {
  alert('History no tiene una función especificada.')
})

function showContainer (activeContainer) {
  containers.forEach(container => {
    if (container === activeContainer) {
      container.classList.add('show')
      container.classList.remove('hide')
    } else {
      container.classList.add('hide')
      container.classList.remove('show')
    }
  })
}

songIdCard.addEventListener('click', () => {
  songsContainer.classList.add('hide')
  songsContainer.classList.remove('show')
  songView.classList.remove('hide')
  songView.classList.add('show')

  try {
    const songId = document.getElementById('idSongInput').value
    fetchSongById(songId)
  } catch (err) {
    alert('No se encontró ninguna canción con ese ID.')
    console.error(err)
  }
})

goBackBtn.addEventListener('click', () => {
  songView.classList.add('hide')
  songView.classList.remove('show')
  songsContainer.classList.remove('hide')
  songsContainer.classList.add('show')
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
  const songContainer = document.querySelector('.song__details')
  songContainer.innerHTML = `
    <h1>${song.name}</h1>
    <p>Artista(s): ${song.artists.join(', ')}</p>
    <p>Álbum: ${song.album}</p>
    <img src="${song.image}" alt="Portada del álbum">
    ${song.preview_url
      ? `
        <div class="audio__player">
          <button id="play-pause">
            <div>
              <i class='bx bx-right-arrow' ></i>
            </div>
          </button>
          <input type="range" id="progress-bar" value="0" min="0" step="0.1">
          <span id="current-time">00:00</span> / <span id="total-time">00:00</span>
          <audio id="audio">
            <source src="${song.preview_url}" type="audio/mpeg">
            Tu navegador no soporta la reproducción de audio.
          </audio>
        </div>
        `
      : '<p>No preview available</p>'}
    `
  const audio = document.getElementById('audio')
  const playPauseBtn = document.getElementById('play-pause')
  const progressBar = document.getElementById('progress-bar')
  const currentTimeDisplay = document.getElementById('current-time')
  const totalTimeDisplay = document.getElementById('total-time')

  function formatTime (time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime
    currentTimeDisplay.textContent = formatTime(audio.currentTime)
  })

  audio.addEventListener('loadedmetadata', () => {
    progressBar.max = audio.duration
    totalTimeDisplay.textContent = formatTime(audio.duration)
  })

  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play()
      playPauseBtn.innerHTML = '<div><i class="bx bx-pause"></i></div>'
    } else {
      audio.pause()
      playPauseBtn.innerHTML = '<div><i class="bx bx-right-arrow"></i></div>'
    }
  })

  progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value
  })
}
