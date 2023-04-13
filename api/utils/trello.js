"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRandomTask = exports.createTrelloCard = void 0;
// @ts-ignore
const node_trello_1 = __importDefault(require("node-trello"));
const lodash_1 = require("lodash");
const http_1 = require("./http");
const API_KEY = '547fda5ce66615ec359f051a1d9536b9';
const TOKEN = 'ATTAe301af5e461dba099c8f9115ac445bd7a273b796f007bdd921fba80105fc9ce3B6226645';
const trello = new node_trello_1.default(API_KEY, TOKEN);
// @ts-ignore
function createTrelloCard(cardData) {
    const { boardName, status, title, tags, deadline, description, members } = cardData;
    console.log('start');
    // @ts-ignore
    trello.get('/1/members/me/boards', function (err, userBoards) {
        if (err)
            throw err;
        // @ts-ignore
        const selectedBoard = userBoards.find((board) => board.name === boardName);
        // @ts-ignore
        trello.get(`/1/boards/${selectedBoard.id}/lists`, function (err, boardLists) {
            if (err)
                throw err;
            // @ts-ignore
            const selectedList = boardLists.find((list) => list.name === status);
            // @ts-ignore
            trello.get(`/1/boards/${selectedBoard.id}/labels`, function (err, labels) {
                if (err)
                    throw err;
                const selectedLables = labels
                    // @ts-ignore
                    .filter((label) => tags.map((tag) => Object.values(tag)[0]).includes(label.name))
                    // @ts-ignore
                    .map((label) => label.id);
                console.log('selectedLables', selectedLables);
                const card = {
                    name: title,
                    desc: description,
                    // due: deadline,
                    idList: selectedList.id,
                    // idMembers: members,
                    idLabels: selectedLables,
                };
                console.log('card11111', card);
                // @ts-ignore
                trello.post('/1/cards', card, function (err, data) {
                    if (err)
                        throw err;
                    console.log(data);
                });
            });
        });
    });
}
exports.createTrelloCard = createTrelloCard;
function sendRandomTask(message, res) {
    // @ts-ignore
    trello.get('/1/members/me/boards', function (err, userBoards) {
        var _a;
        if (err)
            throw err;
        const selectedBoards = userBoards.filter(
        // @ts-ignore
        (board) => board.name === 'Regular Tasks' || board.name === 'One-Time Tasks');
        // @ts-ignore
        trello.get(`/1/boards/${(_a = (0, lodash_1.sample)(selectedBoards)) === null || _a === void 0 ? void 0 : _a.id}/cards`, function (err, boardCards) {
            if (err)
                throw new Error('Error getting cards');
            console.log('boardCards', boardCards);
            const randomCard = (0, lodash_1.sample)(boardCards);
            console.log('randomCard', randomCard);
            const text = randomCard
                ? `Task: ${randomCard.name}\n${randomCard.url}\n\nYou can do this!!!`
                : 'No tasks';
            (0, http_1.sendTelegramBotMessage)(message, text, res);
        });
    });
}
exports.sendRandomTask = sendRandomTask;
