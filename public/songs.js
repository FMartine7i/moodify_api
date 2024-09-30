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
          <div class="song-info-container">
            <h2>${song.name}</h2>
            <p>Artist: ${song.artists.join(', ')}</p>
            <p>Album: ${song.album}</p>
            <p>ID: ${song.customId}</p>
          </div>
          ${song.preview_url ? `<a href="${song.preview_url}" class="preview__btn" target="_blank">Preview</a>` : '<p>No preview available</p>'}
        </div>
      </div>
      `
    songsList.innerHTML += songCard
  })
}
