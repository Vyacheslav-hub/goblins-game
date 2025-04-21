import './style.css'; // подключение стилей
import goblinImage from './img/goblin.png'; // подключаем изображение
import hammerCursor from './img/hammer.png'; // подключаем курсор

// Устанавливаем кастомный курсор
document.body.style.cursor = `url(${hammerCursor}) 16 16, auto`;

// Создание игрового поля
const game = document.getElementById('game');
const cells = [];
for (let i = 0; i < 16; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  game.appendChild(cell);
  cells.push(cell);
}

// Создание изображения гоблина
const goblin = document.createElement('img');
goblin.src = goblinImage;
goblin.classList.add('goblin');

// Перемещение гоблина на случайные клетки
let currentIndex = -1;
let score = 0;
let misses = 0;
let intervalId = null;

// Элементы для вывода счёта
const scoreEl = document.querySelector('.score');
const missesEl = document.querySelector('.misses');

function moveGoblin() {
  // Проверяем, был ли промах
  if (currentIndex !== -1 && cells[currentIndex].contains(goblin)) {
    misses += 1;
    missesEl.textContent = misses;
    if (misses >= 5) {
      endGame();
      return;
    }
  }

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * cells.length);
  } while (newIndex === currentIndex);

  cells[newIndex].appendChild(goblin);
  currentIndex = newIndex;
}

function hitGoblin(event) {
  if (event.target === goblin) {
    score += 1;
    scoreEl.textContent = score;
    goblin.remove(); // убираем гоблина из ячейки после попадания
    currentIndex = -1;
  }
}

function startGame() {
  score = 0;
  misses = 0;
  scoreEl.textContent = score;
  missesEl.textContent = misses;
  intervalId = setInterval(moveGoblin, 1000);
}

function endGame() {
  clearInterval(intervalId);
  alert('Игра окончена!');
}

// Назначаем обработчик клика по полю
game.addEventListener('click', hitGoblin);

// Запускаем игру
startGame();
