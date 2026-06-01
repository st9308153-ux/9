export const createReviewCard = (review) => {
    // Створюємо головний контейнер картки
    const card = document.createElement('div');
    card.className = 'review-card'; 

    // Генерація зірочок на основі рейтингу (наприклад: ★★★★☆)
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

    // Додаємо HTML-структуру з використанням ваших CSS класів
    card.innerHTML = `
        <div class="review-header">
            <img src="${review.avatar}" alt="${review.authorName}" class="review-avatar">
            <div class="review-meta">
                <h4 class="review-author">${review.authorName}</h4>
                <span class="review-date">${review.date}</span>
            </div>
        </div>
        <div class="review-rating" style="color: #f39c12;">${stars}</div>
        <p class="review-text">"${review.comment}"</p>
    `;

    return card;
};