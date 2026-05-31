import { REVIEWS } from './constant.js';

const reviewsContainer = document.getElementById('reviews-container');

// Функція для малювання зірочок рейтингу
function getStars(rating) {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
}

function renderReviews(items) {
  reviewsContainer.innerHTML = ''; 

  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('review-card');

    card.innerHTML = `
      <div class="review-header">
        <img src="${item.avatar}" alt="${item.authorName}" class="review-avatar">
        <div class="review-meta">
          <h3 class="review-author">${item.authorName}</h3>
          <span class="review-date">${item.date}</span>
        </div>
      </div>
      <div class="review-rating">${getStars(item.rating)}</div>
      <p class="review-text">"${item.comment}"</p>
    `;
    reviewsContainer.appendChild(card);
  });
}

// Запускаємо вивід відгуків при завантаженні сторінки
renderReviews(REVIEWS);