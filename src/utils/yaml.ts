import yaml from "js-yaml";

export function parseYamlBase64(base64YamlContent) {
  const yamlContent = Buffer.from(base64YamlContent, "base64").toString();
  const yamlData = yaml.load(yamlContent);
  const cardsData = yamlData?.trello_cards || [];
  return cardsData;
}
