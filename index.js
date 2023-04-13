"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("./dist/utils/http");
const messages_1 = require("./dist/utils/messages");
const trello_1 = require("./dist/utils/trello");
const yaml_1 = require("./dist/utils/yaml");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    console.log('Hello World!');
    res.send('Hello World!');
});
app.post('/upload', async (req, res) => {
    console.log('uploading...');
    const base64YamlContent = req.body.base64YamlContent;
    const cardsData = (0, yaml_1.parseYamlBase64)(base64YamlContent);
    try {
        const cardCreationPromises = cardsData.map(async (cardData) => {
            await (0, trello_1.createTrelloCard)(cardData);
        });
        await Promise.all(cardCreationPromises);
        res.status(200).send('Cards created successfully');
    }
    catch (error) {
        console.error(`Error processing YAML file: ${error}`);
        res.status(500).send('Error processing YAML file');
    }
});
app.post('/new-message', function (req, res) {
    res.end(JSON.stringify(req.body));
    const { message } = req.body;
    console.log('message: ', message, req.body);
    let text = 'Ok';
    if ((message === null || message === void 0 ? void 0 : message.text) === '/getTask') {
        (0, trello_1.sendRandomTask)(message, res);
    }
    if ((message === null || message === void 0 ? void 0 : message.text) === '/info') {
        text = (0, messages_1.getInfoMessage)();
    }
    (0, http_1.sendTelegramBotMessage)(message, text, res);
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
