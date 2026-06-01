import { PRODUCTS } from './data.js';

const gamesGrid = document.getElementById('games-grid');
const cartCountElement = document.getElementById('cart-count');
let cartCount = 0; // Змінна для зберігання кількості товарів у кошику

const renderGames = (games) => {
    gamesGrid.innerHTML = ''; // Очищаємо контейнер перед рендером

    if (games.length === 0) {
        gamesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Ігор у цьому жанрі не знайдено.</p>';
        return;
    }

    games.forEach(game => {
        // Форматуємо жанри у HTML-теги
        const genresHTML = game.genres.map(g => `<span class="game-card__genre">${g}</span>`).join('');
        
        // Логіка знижок
        let badgeHTML = '';
        let oldPriceHTML = '';
        if (game.oldPrice) {
            const discountPercent = Math.round(((game.oldPrice - game.price) / game.oldPrice) * 100);
            badgeHTML = `<div class="game-card__badge">-${discountPercent}%</div>`;
            oldPriceHTML = `<span class="game-card__old-price">${game.oldPrice} ₴</span>`;
        }

        const card = document.createElement('article');
        card.className = 'game-card';
        
        card.innerHTML = `
            <div class="game-card__image-wrapper">
                ${badgeHTML}
                <img src="${game.image}" alt="${game.title}" class="game-card__image">
            </div>
            <div class="game-card__content">
                <div class="game-card__genres">${genresHTML}</div>
                <h3 class="game-card__title">${game.title}</h3>
                <p class="game-card__info">${game.info}</p>
                <div class="game-card__footer">
                    <div class="game-card__prices">
                        <span class="game-card__price">${game.price} ₴</span>
                        ${oldPriceHTML}
                    </div>
                    <button class="btn-buy" data-id="${game.id}">У кошик</button>
                </div>
            </div>
        `;
        
        gamesGrid.appendChild(card);
    });

    // Вішаємо обробник подій на всі нові кнопки "У кошик"
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Візуальний ефект додавання
            const btn = e.target;
            btn.textContent = 'Додано ✅';
            btn.style.backgroundColor = '#2e7d32'; // Зелений
            
            setTimeout(() => {
                btn.textContent = 'У кошик';
                btn.style.backgroundColor = '#6a1b9a'; // Повертаємо фіолетовий
            }, 1000);
        });
    });
};

// Завантажуємо всі ігри при старті
renderGames(PRODUCTS);

// Фільтрація по жанрах
const filterButtons = document.querySelectorAll('.btn-filter');

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Знімаємо клас active з усіх кнопок і додаємо на поточну
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');

        if (filterValue === 'Всі') {
            renderGames(PRODUCTS);
        } else {
            const filteredGames = PRODUCTS.filter(game => game.genres.includes(filterValue));
            renderGames(filteredGames);
        }
    });
});