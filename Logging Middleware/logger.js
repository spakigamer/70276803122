const axios = require('axios');

const LOG_API = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkaHJ1dmdvZWwxNjVAZ21haWwuY29tIiwiZXhwIjoxNzUxOTUyMzIxLCJpYXQiOjE3NTE5NTE0MjEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJhZmRjZGU1OS0zYWMzLTRlZGItYWQ1ZC0yNDA0YjQ3MjNhNWEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJkaHJ1diBnb2VsIiwic3ViIjoiNTgyYWYzNWMtNDMwMC00YzVjLWFjZDQtZjEzNTQ5OGFjNzg5In0sImVtYWlsIjoiZGhydXZnb2VsMTY1QGdtYWlsLmNvbSIsIm5hbWUiOiJkaHJ1diBnb2VsIiwicm9sbE5vIjoiNzAyNzY4MDMxMjIiLCJhY2Nlc3NDb2RlIjoiVlBwc21UIiwiY2xpZW50SUQiOiI1ODJhZjM1Yy00MzAwLTRjNWMtYWNkNC1mMTM1NDk4YWM3ODkiLCJjbGllbnRTZWNyZXQiOiJqQmZ5blpGenlWWWp3eGRqIn0.Odzn_JKaa43YBqBmqP7_xQGb-DoTHtOOuM8zLmdAn5s"; // 🔐 Replace this with your actual token

const allowedStacks = ['backend', 'frontend'];
const allowedLevels = ['info', 'warn', 'error', 'fatal', 'debug'];
const allowedPackages = [
  'cache', 'controller', 'cron_job', 'dh', 'domain', 'handler', 'repository', 'route', 'service',
  'auth', 'config', 'middleware', 'utils'
];

function isValid(value, list) {
  return list.includes(value.toLowerCase());
}

async function log(stack, level, pkg, message) {
  if (!isValid(stack, allowedStacks)) {
    console.error(`[Logger] Invalid stack: "${stack}"`);
    return;
  }

  if (!isValid(level, allowedLevels)) {
    console.error(`[Logger] Invalid level: "${level}"`);
    return;
  }

  if (!isValid(pkg, allowedPackages)) {
    console.error(`[Logger] Invalid package: "${pkg}"`);
    return;
  }

  try {
    const res = await axios.post(
      LOG_API,
      {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message,
      },
      {
        headers: {
          Authorization: AUTH_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    // Optionally log the log ID if needed
    if (res.status === 200) {
      // console.log('[Logger] Log sent successfully:', res.data.logID);
    }
  } catch (err) {
    console.error('[Logger] Failed to send log:', err.response?.data || err.message);
  }
}

module.exports = { log };
