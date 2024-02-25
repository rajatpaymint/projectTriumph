import axios from "axios";
import { URL } from "../Constants/urls";

export async function GoogleSigninFunction(email, name, profilePhoto) {
  console.log("Inside fetch GoogleSingin");
  const response = await axios.post(URL.appApiUrl + "/app/GoogleSignin", {
    email: email,
    name: name,
    profilePhoto: profilePhoto,
  });
  console.log("Response.data: ", response.data);
  return response.data;
}

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

export async function saveProfilePhone(userId, phone) {
  console.log("In saveProfilePhone");
  const response = await axios.post(URL.appApiUrl + "/app/saveProfilePhone", {
    userId: userId,
    phone: phone,
  });
  return response.data;
}

export async function saveProfileCity(userId, city) {
  console.log("In saveProfileCity");
  const response = await axios.post(URL.appApiUrl + "/app/saveProfileCity", {
    userId: userId,
    city: city,
  });
  return response.data;
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

export async function fetchNewsLearn(newsId) {
  console.log("Inside fetchNewsLearn");
  const response = await axios.post(URL.appApiUrl + "/app/getNewsLearn", {
    newsId: newsId,
  });
  return response.data;
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
  console.log("Data: ", data);
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

export async function getInvestorDirectory(currentPage, pageLength) {
  console.log("Entered into getInvestors");
  const response = await axios.post(URL.appApiUrl + "/app/getInvestorDirectory", {
    currentPage: currentPage,
    pageLength: pageLength,
  });
  data = {
    investorList: response.data["investorList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  console.log("Data: ", data);
  return data;
}

export async function getIncubators(currentPage, pageLength) {
  console.group("Entered into getIncubators");
  const response = await axios.post(URL.appApiUrl + "/app/getIncubators", {
    currentPage: currentPage,
    pageLength: pageLength,
  });
  data = {
    incubatorList: response.data["incubatorList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  console.log("Data: ", data);
  return data;
}

export async function createOrder(amount, subscriptionId, userId) {
  console.log("Entered createOrder");
  const response = await axios.post(URL.appApiUrl + "/app/createOrder", {
    amount: amount,
    subscriptionId: subscriptionId,
    userId: userId,
  });
  console.log("Response data: ", response.data);
  return response.data;
}

export async function updatePayment(checkoutData) {
  console.log("I am in update payment: ", checkoutData);
  const response = await axios.post(URL.appApiUrl + "/app/updatePayment", {
    pgOrderId: checkoutData["razorpay_order_id"],
    pgPaymentId: checkoutData["razorpay_payment_id"],
    pgSignature: checkoutData["razorpay_signature"],
    pgStatus: checkoutData["status_code"],
  });
  console.log("Response data: ", response.data);
  return response.data;
}

export async function getUserSubscription(userId) {
  console.log("Entered getUserSubscription: ", userId);
  const response = await axios.post(URL.appApiUrl + "/app/getUserSubscription", {
    userId: userId,
  });
  console.log("Response data: ", response.data);
  return response.data;
}

export async function getSubscriptionList() {
  console.log("Entered getSubscriptionList");
  const response = await axios.post(URL.appApiUrl + "/app/getSubscriptionList");
  console.log("Subscription List: ", response.data);
  return response.data;
}

export async function checkToken(userId, token) {
  console.log("I am in checkToken");
  const response = await axios.post(URL.appApiUrl + "/app/checkToken", {
    userId: userId,
    token: token,
  });
  console.log("checkToken Response: ", response.data);
  return response.data;
}

export async function generateMarketReport(industry, marketType, subscriptionId, userId) {
  console.log("I am in generateMarketReport");
  const response = await axios.post(URL.appApiUrl + "/app/generateMarketReport", {
    industry: industry,
    marketType: marketType,
    subscriptionId: subscriptionId,
    userId: userId,
  });
  console.log(response.data);
  return response.data;
}

export async function getFolderList() {
  console.log("IN getFolderList");
  const response = await axios.post(URL.appApiUrl + "/app/getFolderList");
  console.log("Response: ", response.data);
  return response.data;
}

export async function getResourceItems(id) {
  console.log("In getResourceItems");
  const response = await axios.post(URL.appApiUrl + "/app/getResourceItems", {
    id: id,
  });
  console.log("FileList Data: ", response.data);
  return response.data;
}

export async function getSingleFile(id) {
  console.log("In getSingleFile");
  const response = await axios.post(URL.appApiUrl + "/app/getSingleFile", {
    id: id,
  });
  console.log("Response Data: ", response.data);
  return response.data;
}
