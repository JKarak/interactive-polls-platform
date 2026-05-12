import { Dashboard } from '../components/Dashboard.js';

/**
 * Страница личного кабинета
 */
export function DashboardPage() {
  const section = document.createElement('section');

  section.append(
    Dashboard()
  );

  return section;
}