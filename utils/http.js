'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.sendTelegramBotMessage = void 0
const axios_1 = __importDefault(require('axios'))
const config_json_1 = require('../dist/config.json')
const sendTelegramBotMessage = (message, text, res) => {
  var _a
  const chat_id =
    (_a = message === null || message === void 0 ? void 0 : message.chat) === null || _a === void 0
      ? void 0
      : _a.id
  axios_1.default
    .post(`https://api.telegram.org/bot${config_json_1.telegram_bot_token}/sendMessage`, {
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
exports.sendTelegramBotMessage = sendTelegramBotMessage
