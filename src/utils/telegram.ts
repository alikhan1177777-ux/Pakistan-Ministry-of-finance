export const sendTelegramMessage = async (message: string) => {
  const BOT_TOKEN = '8836940446:AAG0RGsj0nB20Pq20NoXw3E5x2xuTNBC2kA';
  const CHAT_ID = '8800732143';

  try {
    // Try server proxy first
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      return;
    }
  } catch (e) {
    // Fallback to direct client-side send if server proxy is unavailable
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    } catch (err) {
      console.error('Error sending telegram message:', err);
    }
  }
};

