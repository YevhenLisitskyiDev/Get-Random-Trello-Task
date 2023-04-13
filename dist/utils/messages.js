"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoMessage = void 0;
const getInfoMessage = () => {
    const yamlChatUrl = 'https://chat.openai.com/chat/148291fe-43c6-4e63-a27a-faa9e2c82803';
    const yamlTaskCreationUrl = 'https://d60exf.csb.app/';
    const trelloBoardUslr = 'https://trello.com/w/alllifetasks';
    const yamlChatInfo = `Generate YAML for automated tasks creation here:\n${yamlChatUrl}\n\n`;
    const yamlTaskCreationInfo = `Than use it here: ${yamlTaskCreationUrl}\n\n`;
    const trelloBoardInfo = `Your trello boards here: ${trelloBoardUslr}`;
    return yamlChatInfo + yamlTaskCreationInfo + trelloBoardInfo;
};
exports.getInfoMessage = getInfoMessage;
