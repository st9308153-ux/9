// Імпортуємо компонент картки та масив даних
import { createReviewCard } from './components/ReviewCard.js';
import { REVIEWS } from './constant.js'; 

document.addEventListener('DOMContentLoaded', () => {
    
    // Знаходимо контейнер для відгуків
    const reviewsContainer = document.getElementById('reviews-container');
    
    // Рендеримо відгуки, якщо контейнер існує на сторінці
    if (reviewsContainer) {
        REVIEWS.forEach(data => {
            reviewsContainer.appendChild(createReviewCard(data));
        });
    }
});