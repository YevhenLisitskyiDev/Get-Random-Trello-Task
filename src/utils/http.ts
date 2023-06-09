import axios from 'axios'
import { telegram_bot_token } from '../config.json'

export const sendTelegramBotMessage = (
  message: { chat: { id: string } },
  text: string,
  res: any
) => {
  const chat_id = message?.chat?.id

  axios
    .post(`https://api.telegram.org/bot${telegram_bot_token}/sendMessage`, {
      chat_id,
      text,
    })
    .then((response) => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end(res)
    })
    .catch((err) => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
}
