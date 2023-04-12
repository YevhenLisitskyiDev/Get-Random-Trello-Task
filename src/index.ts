import express from "express";
import multer from "multer";
import cors from "cors";
import { createTrelloCard } from "./trello";
import { parseYamlBase64 } from "./utils/yaml";
import { sendRandomTask } from "./trello";

const TelegramBot = require("node-telegram-bot-api");
const config = require("./config.json");

const bot = new TelegramBot(config.telegram_bot_token, { polling: true });

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.post("/upload", async (req, res) => {
  const base64YamlContent = req.body.base64YamlContent;
  const cardsData = parseYamlBase64(base64YamlContent);

  try {
    const cardCreationPromises = cardsData.map(async (cardData) => {
      await createTrelloCard(cardData);
    });

    await Promise.all(cardCreationPromises);
    res.status(200).send("Cards created successfully");
  } catch (error) {
    console.error(`Error processing YAML file: ${error}`);
    res.status(500).send("Error processing YAML file");
  }
});
const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

bot.onText(/\/getTask/, async (msg) => {
  sendRandomTask(msg, bot);
});

bot.onText(/\/info/, async (msg) => {
  const chatId = msg.chat.id;
  const yamlChaturl =
    "https://chat.openai.com/chat/148291fe-43c6-4e63-a27a-faa9e2c82803";
  const yamlTaskCreationUrl = "https://d60exf.csb.app/";
  const erllBoaodrUslr = "https://trello.com/w/alllifetasks";
  const message = `Generate YAML for automated tasks creation here:\n${yamlChaturl}\n\nThan use it here: ${yamlTaskCreationUrl}\n\nYour trello boards here: ${erllBoaodrUslr}`;

  bot.sendMessage(chatId, message);
});
