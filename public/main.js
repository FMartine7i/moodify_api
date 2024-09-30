const songs = document.getElementById('songs')
const artists = document.getElementById('artists')
const playlists = document.getElementById('playlists')
const albums = document.getElementById('albums')
const songsContainer = document.querySelector('.songs__container')
const artistsContainer = document.querySelector('.artists__container')
const playlistsContainer = document.querySelector('.playlists__container')
const albumsContainer = document.querySelector('.albums__container')
const containers = [songsContainer, artistsContainer, playlistsContainer, albumsContainer]
const showAllSongs = document.querySelector('.card__1')
const getSongById = document.querySelector('.card__2')
const getSongsByMood = document.querySelector('.card__3')

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
    }
    else {
      container.classList.add('hide')
      container.classList.remove('show')
    }
  })
}
