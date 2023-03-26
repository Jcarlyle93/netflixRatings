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
  
  function insertRating(element, rating) {
    const ratingElement = document.createElement('div');
    ratingElement.className = 'imdb-rating';
    ratingElement.textContent = `IMDb: ${rating}`;
  
    element.appendChild(ratingElement);
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
  const titleElements = document.querySelectorAll('.your-title-element-selector');
  titleElements.forEach(processTitleElement);