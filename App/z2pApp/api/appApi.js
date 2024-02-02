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

export async function getProfileDetails(email) {
  const response = await axios.post(URL.appApiUrl + "/app/getProfileDetails", {
    email: email,
  });
  data = {
    userName: response.data["name"],
    city: response.data["city"],
    mobile: response.data["mobile"],
    signupDate: response.data["signupDate"],
  };
  return data;
}

export async function getNewsletterList(currentPage, pageLength) {
  const response = await axios.post(URL.appApiUrl + "/app/getNewsletterList", {
    currentPage: currentPage,
    pageLength: pageLength,
  });
  data = {
    newsletterList: response.data["newsletterList"],
    statusCode: response.data["statusCode"],
  };
  return data;
}

export async function getSingleArticle(id) {
  const response = await axios.post(URL.appApiUrl + "/app/getSingleArticle", {
    id: id,
  });
  console.log("Imagelink: ", response.data["imageLink"]);
  data = { content: response.data["content"], headline: response.data["headline"], createdBy: response.data["createdBy"], publishDate: response.data["publishDate"], imageLink: response.data["imageLink"] };
  return data;
}

export async function getNewsList(currentPage, pageLength) {
  console.log("Entered here");
  const response = await axios.post(URL.appApiUrl + "/app/getNewsList", {
    currentPage: currentPage,
    pageLength: pageLength,
  });
  data = {
    newsList: response.data["newsList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function getHeadlines(currentPage, pageLength) {
  console.log("Entered in get headlines");
  const response = await axios.post(URL.appApiUrl + "/app/getHeadlines", {
    currentPage: currentPage,
    pageLength: pageLength,
  });
  data = {
    headlineList: response.data["headlineList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function getSingleNews(id) {
  console.log("I am here");
  const response = await axios.post(URL.appApiUrl + "/app/getSingleNews", {
    id: id,
  });
  data = {
    newsItems: response.data["newsItems"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function getTopics() {
  console.log("Entered into getTopics");
  const response = await axios.post(URL.appApiUrl + "/app/getTopics");
  data = {
    topicList: response.data["topicList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  console.log("Get topics DataL: ", data);
  return data;
}

export async function getTopicNews(id, currentPage, pageLength) {
  console.log("Entered into getTopicNews");
  const response = await axios.post(URL.appApiUrl + "/app/getTopicNews", {
    id: id,
    currentPage: currentPage,
    pageLength: pageLength,
  });
  data = {
    newsList: response.data["newsList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  console.log("Get topics DataL: ", data);
  return data;
}

export async function getQuestions(userId) {
  console.log("Entered into getQuestions");
  const response = await axios.post(URL.appApiUrl + "/app/getQuestions", {
    userId: userId,
  });
  data = {
    questionList: response.data["questionList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function askQuestion(userId, question) {
  console.log("Entered into askQuestion");
  const response = await axios.post(URL.appApiUrl + "/app/askQuestion", {
    userId: userId,
    question: question,
  });
  data = {
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function getEvents(city) {
  console.log("Entered into getEvents");
  const response = await axios.post(URL.appApiUrl + "/app/getEvents", {
    city: city,
  });
  console.log("Response:  ", response.data["eventList"]);
  data = {
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
    eventList: response.data["eventList"],
  };
  return data;
}

export async function getCityList() {
  console.log("entered into getCityList");
  const response = await axios.post(URL.appApiUrl + "/app/getCityList");
  data = {
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
    cityList: response.data["cityList"],
  };
  return data;
}
