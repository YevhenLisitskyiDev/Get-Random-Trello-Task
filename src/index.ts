import express from 'express'
import cors from 'cors'

import { sendTelegramBotMessage } from './utils/http'
import { getInfoMessage } from './utils/messages'
import { createTrelloCard, sendRandomTask } from './utils/trello'
import { parseYamlBase64 } from './utils/yaml'

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  console.log('Hello World!')
  res.send('Hello World!')
})

app.post('/upload', async (req, res) => {
  console.log('uploading...')
  const base64YamlContent = req.body.base64YamlContent
  const cardsData = parseYamlBase64(base64YamlContent)

  try {
    const cardCreationPromises = cardsData.map(async (cardData: any) => {
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
  res.end(req.body)
  const { message } = req.body
  console.log('message: ', message, req.body)
  let text = 'Ok'

  if (message?.text === '/getTask') {
    sendRandomTask(message, res)
  }

  if (message?.text === '/info') {
    text = getInfoMessage()
  }

  sendTelegramBotMessage(message, text, res)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
