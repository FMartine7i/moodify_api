function displayArtists (artists) {
  const artistsList = document.getElementById('artistsList')
  artistsList.innerHTML = ''
  artists.forEach(artists => {
    const artistCard = `
        <div class="artist__container">
        <img width="150px" src="${artist.image} || './imgs/default_image.jpg'}" alt="Artist Image">
        <div class="artist__info">
        `
  })
}
