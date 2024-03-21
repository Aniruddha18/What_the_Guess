import axios from "axios";
import { dictionary } from "./data";
import OpenAI from "openai";

// const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// export const GenerateWord = async (prompt) => {
//   const reqBody = {
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//     max_tokens: 512,
//     top_p: 1,
//     temperature: 0.5,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   };

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       reqBody,
//       {
//         headers: {
//           Authorization: "Bearer " + API_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const word = response.data.choices[0].message.content;
//     return word;
//   } catch (err) {
//     console.log("err", err);
//     return err;
//   }
// };

export const RandomWord = () => {
  const randomIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[randomIndex];
};

const client = new OpenAI({
  apiKey: process.env.REACT_APP_TOGETHER_API_KEY,
  baseURL: "https://api.together.xyz/v1",
  dangerouslyAllowBrowser: true,
});
console.log("apiKey", process.env.REACT_APP_TOGETHER_API_KEY);
export const GenerateWord = async (prompt) => {
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  });

  const output = response.choices[0].message.content;
  console.log(output);
};
