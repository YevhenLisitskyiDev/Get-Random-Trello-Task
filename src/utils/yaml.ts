import yaml from "js-yaml";

// @ts-ignore
export function parseYamlBase64(base64YamlContent) {
  const yamlContent = Buffer.from(base64YamlContent, "base64").toString();
  const yamlData = yaml.load(yamlContent);
  // @ts-ignore
  const cardsData = yamlData?.trello_cards || [];
  return cardsData;
}
