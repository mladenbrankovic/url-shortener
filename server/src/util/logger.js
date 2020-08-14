import { blue, green, grey, magenta, red, yellow } from 'chalk';
import { format } from 'date-fns';

/**
 * Echoes given content to console.
 *
 * Depending on the `type` given, the output will vary in color and keyword.
 * The output is formatted as follows:
 *
 * `[yyyy-MM-dd HH:mm:ss] [TYPE] content`
 *
 * @param {any} content Content to be logged
 * @param {string} type Decides the type of log to be displayed
 */
export function log(content, type = 'log') {
  const timestamp = `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`;

  switch (type) {
    case 'log':
    case 'access':
      console.log(`${grey(`${timestamp} [${type.toUpperCase()}] ${content}`)}`);
      break;

    case 'error':
      console.log(`\n${timestamp} ${red(`[${type.toUpperCase()}]`)} ${content}\n`);
      break;

    case 'info':
      console.log(`${timestamp} ${blue(`[${type.toUpperCase()}]`)} ${content}`);
      break;

    case 'warning':
    case 'not found':
      console.log(`${timestamp} ${yellow(`[${type.toUpperCase()}]`)} ${content}`);
      break;

    case 'debug':
      console.log(`${timestamp} ${magenta(`[${type.toUpperCase()}]`)} ${content}`);
      break;

    case 'notification':
      console.log(`\n${timestamp} ${green(`[${type.toUpperCase()}]`)} ${content}\n`);
      break;

    case 'newline':
      console.log('\n');
      break;

    default:
      console.log(`${grey(`${timestamp} [UNKNOWN TYPE] ${content}`)}`);
      break;
  }
}

/**
 * Calls `log()` with type `access`.
 *
 * @param {any} content Content to be logged
 */
export function access(content) {
  log(content, 'access');
}

/**
 * Calls `log()` with type `error`.
 *
 * @param {any} content Content to be logged
 */
export function error(content) {
  log(content, 'error');
}

/**
 * Calls `log()` with type `info`.
 *
 * @param {any} content Content to be logged
 */
export function inform(content) {
  log(content, 'info');
}

/**
 * Calls `log()` with type `warning`.
 *
 * @param {any} content Content to be logged
 */
export function warn(content) {
  log(content, 'warning');
}

/**
 * Calls `log()` with type `notFound`.
 *
 * @param {any} content Content to be logged
 */
export function notFound(content) {
  log(content, 'not found');
}

/**
 * Calls `log()` with type `debug`.
 *
 * @param {any} content Content to be logged
 */
export function debug(content) {
  log(content, 'debug');
}

/**
 * Calls `log()` with type `notify`.
 *
 * @param {any} content Content to be logged
 */
export function notify(content) {
  log(content, 'notification');
}

/**
 * Calls `log()` with type `newline`.
 *
 * @param {any} content Content to be logged
 */
export function newline() {
  log('', 'newline');
}
