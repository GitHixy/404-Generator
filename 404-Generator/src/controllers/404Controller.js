// Controller for 404 page generation
export function generate404Html({ colors, emoji, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 Not Found</title>
  <style>
    body {
      background: ${colors.background};
      color: ${colors.text};
      font-family: 'Segoe UI', Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      transition: background 0.3s, color 0.3s;
    }
    .emoji {
      font-size: 5rem;
      margin-bottom: 1rem;
    }
    .message {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .theme-accent {
      color: ${colors.accent};
    }
  </style>
</head>
<body>
  <div class="emoji">${emoji}</div>
  <div class="message">${message}</div>
  <div class="theme-accent">404</div>
</body>
</html>`;
}
