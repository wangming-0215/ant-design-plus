export { default as store } from './storage';

/**
 * sleep in milliseconds
 * @param delay
 * @returns
 */
export function sleep(delay: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });
}
