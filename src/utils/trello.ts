import Trello from 'node-trello'
import { sample } from 'lodash'
import { sendTelegramBotMessage } from './http'

const API_KEY = '547fda5ce66615ec359f051a1d9536b9'
const TOKEN = 'ATTAe301af5e461dba099c8f9115ac445bd7a273b796f007bdd921fba80105fc9ce3B6226645'

const trello = new Trello(API_KEY, TOKEN)

export function createTrelloCard(cardData) {
  const { boardName, status, title, tags, deadline, description, members } = cardData

  console.log('start')
  trello.get('/1/members/me/boards', function (err, userBoards) {
    if (err) throw err

    const selectedBoard = userBoards.find((board) => board.name === boardName)

    trello.get(`/1/boards/${selectedBoard.id}/lists`, function (err, boardLists) {
      if (err) throw err

      const selectedList = boardLists.find((list) => list.name === status)

      trello.get(`/1/boards/${selectedBoard.id}/labels`, function (err, labels) {
        if (err) throw err

        const selectedLables = labels
          .filter((label) => tags.map((tag) => Object.values(tag)[0]).includes(label.name))
          .map((label) => label.id)
        console.log('selectedLables', selectedLables)
        const card = {
          name: title,
          desc: description,
          // due: deadline,
          idList: selectedList.id,
          // idMembers: members,
          idLabels: selectedLables,
        }

        console.log('card11111', card)

        trello.post('/1/cards', card, function (err, data) {
          if (err) throw err
          console.log(data)
        })
      })
    })
  })
}

export function sendRandomTask(message: { chat: { id: string } }, res: any) {
  trello.get('/1/members/me/boards', function (err, userBoards) {
    if (err) throw err

    const selectedBoards = userBoards.filter(
      (board) => board.name === 'Regular Tasks' || board.name === 'One-Time Tasks'
    )

    trello.get(`/1/boards/${sample(selectedBoards)?.id}/cards`, function (err, boardCards) {
      if (err) throw new Error('Error getting cards')

      console.log('boardCards', boardCards)

      const randomCard = sample(boardCards)
      console.log('randomCard', randomCard)

      const text = randomCard
        ? `Task: ${randomCard.name}\n${randomCard.url}\n\nYou can do this!!!`
        : 'No tasks'

      sendTelegramBotMessage(message, text, res)
    })
  })
}
