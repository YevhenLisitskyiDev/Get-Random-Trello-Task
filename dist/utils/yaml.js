"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseYamlBase64 = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
// @ts-ignore
function parseYamlBase64(base64YamlContent) {
    const yamlContent = Buffer.from(base64YamlContent, "base64").toString();
    const yamlData = js_yaml_1.default.load(yamlContent);
    // @ts-ignore
    const cardsData = (yamlData === null || yamlData === void 0 ? void 0 : yamlData.trello_cards) || [];
    return cardsData;
}
exports.parseYamlBase64 = parseYamlBase64;
