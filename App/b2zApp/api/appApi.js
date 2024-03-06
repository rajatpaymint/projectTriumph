import axios from "axios";
import { URL } from "../Constants/urls";
import Config from "react-native-config";

const apiKey = Config.API_KEY;

export async function GoogleSigninFunction(email, name, profilePhoto) {
  // console.log("Inside fetch GoogleSingin: ", apiKey);
  console.log("AK: ", process.env.EXPO_PUBLIC_API_KEY); // Outputs the value based on the build profile
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  console.log("URL: ", URL.appApiUrl + "/app/GoogleSignin");
  const response = await axios.post(
    URL.appApiUrl + "/app/GoogleSignin",
    {
      email: email,
      name: name,
      profilePhoto: profilePhoto,
    },
    config
  );
  console.log("Response.data: ", response.data);
  return response.data;
}

export async function getAllTopics() {
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(URL.appApiUrl + "/app/getAllTopics", {}, config);
  allTopicData = response.data["topicList"];
  return allTopicData;
}

export async function getMyTopics(email) {
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getMyTopics",
    {
      email: email,
    },
    config
  );
  myTopicData = response.data["myTopicList"];
  return myTopicData;
}

export async function removeTopic(email, topicId) {
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/removeTopic",
    {
      email: email,
      topicId: topicId,
    },
    config
  );
  apiMessage = response.data["apiMessage"];
  return apiMessage;
}

export async function addTopic(email, topicId, userId, topic, iconLink) {
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/addTopic",
    {
      email: email,
      topicId: topicId,
      userId: userId,
      topic: topic,
      iconLink: iconLink,
    },
    config
  );
  apiMessage = response.data["apiMessage"];
  return apiMessage;
}

export async function getProfileDetails(email) {
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getProfileDetails",
    {
      email: email,
    },
    config
  );
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
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/saveProfilePhone",
    {
      userId: userId,
      phone: phone,
    },
    config
  );
  return response.data;
}

export async function saveProfileCity(userId, city) {
  console.log("In saveProfileCity");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/saveProfileCity",
    {
      userId: userId,
      city: city,
    },
    config
  );
  return response.data;
}

export async function getNewsletterList(currentPage, pageLength) {
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getNewsletterList",
    {
      currentPage: currentPage,
      pageLength: pageLength,
    },
    config
  );
  data = {
    newsletterList: response.data["newsletterList"],
    statusCode: response.data["statusCode"],
  };
  return data;
}

export async function getSingleArticle(id) {
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getSingleArticle",
    {
      id: id,
    },
    config
  );
  console.log("Imagelink: ", response.data["imageLink"]);
  data = { content: response.data["content"], headline: response.data["headline"], createdBy: response.data["createdBy"], publishDate: response.data["publishDate"], imageLink: response.data["imageLink"], description: response.data["description"] };
  return data;
}

export async function getNewsList(currentPage, pageLength) {
  console.log("Entered here");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getNewsList",
    {
      currentPage: currentPage,
      pageLength: pageLength,
    },
    config
  );
  data = {
    newsList: response.data["newsList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function fetchNewsLearn(newsId) {
  console.log("Inside fetchNewsLearn");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getNewsLearn",
    {
      newsId: newsId,
    },
    config
  );
  return response.data;
}

export async function getHeadlines(currentPage, pageLength) {
  console.log("Entered in get headlines");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getHeadlines",
    {
      currentPage: currentPage,
      pageLength: pageLength,
    },
    config
  );
  data = {
    headlineList: response.data["headlineList"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function getSingleNews(id) {
  console.log("I am here");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getSingleNews",
    {
      id: id,
    },
    config
  );
  data = {
    newsItems: response.data["newsItems"],
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function getTopics() {
  console.log("Entered into getTopics");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(URL.appApiUrl + "/app/getTopics", {}, config);
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
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getTopicNews",
    {
      id: id,
      currentPage: currentPage,
      pageLength: pageLength,
    },
    config
  );
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
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getQuestions",
    {
      userId: userId,
    },
    config
  );
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
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/askQuestion",
    {
      userId: userId,
      question: question,
    },
    config
  );
  data = {
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
  };
  return data;
}

export async function getEvents(city) {
  console.log("Entered into getEvents");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getEvents",
    {
      city: city,
    },
    config
  );
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
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(URL.appApiUrl + "/app/getCityList", {}, config);
  data = {
    statusCode: response.data["statusCode"],
    apiMessage: response.data["apiMessage"],
    cityList: response.data["cityList"],
  };
  return data;
}

export async function getInvestorDirectory(currentPage, pageLength) {
  console.log("Entered into getInvestors");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getInvestorDirectory",
    {
      currentPage: currentPage,
      pageLength: pageLength,
    },
    config
  );
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
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getIncubators",
    {
      currentPage: currentPage,
      pageLength: pageLength,
    },
    config
  );
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
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/createOrder",
    {
      amount: amount,
      subscriptionId: subscriptionId,
      userId: userId,
    },
    config
  );
  console.log("Response data: ", response.data);
  return response.data;
}

export async function updatePayment(checkoutData) {
  console.log("I am in update payment: ", checkoutData);
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/updatePayment",
    {
      pgOrderId: checkoutData["razorpay_order_id"],
      pgPaymentId: checkoutData["razorpay_payment_id"],
      pgSignature: checkoutData["razorpay_signature"],
      pgStatus: checkoutData["status_code"],
    },
    config
  );
  console.log("Response data: ", response.data);
  return response.data;
}

export async function getUserSubscription(userId) {
  console.log("Entered getUserSubscription: ", userId);
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getUserSubscription",
    {
      userId: userId,
    },
    config
  );
  console.log("Response data: ", response.data);
  return response.data;
}

export async function getSubscriptionList() {
  console.log("Entered getSubscriptionList");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(URL.appApiUrl + "/app/getSubscriptionList", {}, config);
  console.log("Subscription List: ", response.data);
  return response.data;
}

export async function checkToken(userId, token) {
  console.log("I am in checkToken");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/checkToken",
    {
      userId: userId,
      token: token,
    },
    config
  );
  console.log("checkToken Response: ", response.data);
  return response.data;
}

export async function generateMarketReport(industry, marketType, subscriptionId, userId) {
  console.log("I am in generateMarketReport");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/generateMarketReport",
    {
      industry: industry,
      marketType: marketType,
      subscriptionId: subscriptionId,
      userId: userId,
    },
    config
  );
  console.log(response.data);
  return response.data;
}

export async function getFolderList() {
  console.log("IN getFolderList");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(URL.appApiUrl + "/app/getFolderList", {}, config);
  console.log("Response: ", response.data);
  return response.data;
}

export async function getResourceItems(id) {
  console.log("In getResourceItems");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getResourceItems",
    {
      id: id,
    },
    config
  );
  console.log("FileList Data: ", response.data);
  return response.data;
}

export async function getSingleFile(id) {
  console.log("In getSingleFile");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/getSingleFile",
    {
      id: id,
    },
    config
  );
  console.log("Response Data: ", response.data);
  return response.data;
}

export async function forgotPassword(email) {
  console.log("In forgotPassword");
  const config = {
    headers: {
      "X-API-Key": process.env.EXPO_PUBLIC_API_KEY,
    },
  };
  const response = await axios.post(
    URL.appApiUrl + "/app/forgotPassword",
    {
      email: email,
    },
    config
  );
  console.log("Response of forgotPassword: ", response.data);
  return response.data;
}
