// public/main.js
document.addEventListener('DOMContentLoaded', () => {
  const searchForm    = document.getElementById('search-form');
  const resultsDiv    = document.getElementById('results');
  const watchlistDiv  = document.getElementById('watchlist');

  // 1️⃣ Load & render watchlist on page load
  async function loadWatchlist() {
    const res  = await fetch('/api/watchlist');
    const list = await res.json();
    watchlistDiv.innerHTML = '';
    list.forEach(movie => {
      watchlistDiv.appendChild(createCard(movie, true));
    });
  }

  // 2️⃣ Create a movie card (add or remove button)
  function createCard(movie, isWatchlist) {
    const div = document.createElement('div');
    div.className = 'movie-card';
    div.innerHTML = `
      <h3>${movie.Title} (${movie.Year})</h3>
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : ''}" alt="Poster" width="100">
      <button>${isWatchlist ? 'Remove' : 'Add'}</button>
    `;

    div.querySelector('button').addEventListener('click', async () => {
      if (isWatchlist) {
        await fetch(`/api/watchlist/${movie.imdbID}`, { method: 'DELETE' });
      } else {
        await fetch('/api/watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(movie)
        });
      }
      loadWatchlist();
    });

    return div;
  }

  // 3️⃣ Handle the search form
  searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    if (!title) return;

    const res  = await fetch(`/api/search?title=${encodeURIComponent(title)}`);
    const data = await res.json();
    resultsDiv.innerHTML = '';

    if (data.Search) {
      data.Search.forEach(m => {
        resultsDiv.appendChild(createCard(m, false));
      });
    } else {
      resultsDiv.innerText = data.Error || 'No results found.';
    }
  });

  // initial load
  loadWatchlist();
});
