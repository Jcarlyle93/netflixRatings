function fetchIMDbRating(title) {
    const apiKey = '922b07df';
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          return data.imdbRating;
        } else {
          return null;
        }
      })
      .catch(error => {
        console.error('Error fetching IMDb rating:', error);
        return null;
      });
  }
  
  function insertRating(thumbnailElement, rating) {
    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'imdb-rating-container';
  
    const ratingElement = document.createElement('div');
    ratingElement.className = 'imdb-rating';
    ratingElement.textContent = `IMDb: ${rating}`;
  
    ratingContainer.appendChild(ratingElement);
    thumbnailElement.appendChild(ratingContainer);
  }
  
  function processTitleElement(titleElement) {
    const title = titleElement.textContent.trim();
  
    if (title) {
      fetchIMDbRating(title).then(rating => {
        if (rating) {
          insertRating(titleElement, rating);
        }
      });
    }
  }
  
  // You will need to adjust this query selector for the Netflix layout.
  const thumbnailElements = document.querySelectorAll('.your-thumbnail-element-selector');
  thumbnailElements.forEach(processThumbnailElement);