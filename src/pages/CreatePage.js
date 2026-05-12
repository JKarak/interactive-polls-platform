import { CreatePoll } from '../components/CreatePoll.js';

/**
 * Страница создания опроса
 */
export function CreatePage() {
  const section = document.createElement('section');

  section.append(
    CreatePoll()
  );

  return section;
}