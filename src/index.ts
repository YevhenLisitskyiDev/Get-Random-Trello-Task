import express from 'express'
import cors from 'cors'
import axios from 'axios'

import { sendTelegramBotMessage } from './utils/http'
import { getInfoMessage } from './utils/messages'
import { createTrelloCard, sendRandomTask } from './utils/trello'
import { parseYamlBase64 } from './utils/yaml'

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.post('/upload', async (req, res) => {
  const base64YamlContent = req.body.base64YamlContent
  const cardsData = parseYamlBase64(base64YamlContent)

  try {
    const cardCreationPromises = cardsData.map(async (cardData) => {
      await createTrelloCard(cardData)
    })

    await Promise.all(cardCreationPromises)
    res.status(200).send('Cards created successfully')
  } catch (error) {
    console.error(`Error processing YAML file: ${error}`)
    res.status(500).send('Error processing YAML file')
  }
})

app.post('/new-message', function (req, res) {
  const { message } = req.body
  let text = 'Ok'

  if (message.text === '/getTask') {
    sendRandomTask(message, text, res)
  }

  if (message.text === '/info') {
    text = getInfoMessage()
  }

  sendTelegramBotMessage(message, text, res)
})

const PORT = process.env.PORT || 3004

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
