import axios from "axios";
import { URL } from "../Constants/urls";

export async function getAllTopics() {
  const response = await axios.post(URL.appApiUrl + "/app/getAllTopics");
  allTopicData = response.data["topicList"];
  return allTopicData;
}

export async function getMyTopics(email) {
  const response = await axios.post(URL.appApiUrl + "/app/getMyTopics", {
    email: email,
  });
  myTopicData = response.data["myTopicList"];
  return myTopicData;
}

export async function removeTopic(email, topicId) {
  const response = await axios.post(URL.appApiUrl + "/app/removeTopic", {
    email: email,
    topicId: topicId,
  });
  apiMessage = response.data["apiMessage"];
  return apiMessage;
}

export async function addTopic(email, topicId, userId, topic, iconLink) {
  const response = await axios.post(URL.appApiUrl + "/app/addTopic", {
    email: email,
    topicId: topicId,
    userId: userId,
    topic: topic,
    iconLink: iconLink,
  });
  apiMessage = response.data["apiMessage"];
  return apiMessage;
}
