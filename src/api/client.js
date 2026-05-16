/**
 * Простая задержка
 */
function delay(ms = 200) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Mock polls
 */
const mockPolls = [
  {
    id: 'poll_1',
    question: 'Ваш любимый язык программирования?',
    description: 'Выберите один вариант',
    category: 'IT',
    type: 'single',
    createdAt: '2026-01-01',
    expiresAt: '2099-01-01',
    authorId: 'system',
    options: [
      {
        id: 'option_1',
        text: 'JavaScript'
      },
      {
        id: 'option_2',
        text: 'Python'
      },
      {
        id: 'option_3',
        text: 'Java'
      }
    ]
  }
];

/**
 * Получить опросы
 */
export async function fetchPolls() {
  await delay();

  return mockPolls;
}