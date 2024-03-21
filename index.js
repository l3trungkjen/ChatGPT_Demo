const OpenAI = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

let APIcall = async () => {
  const openai = new OpenAI({
    apiKey: 'API_KEY',
    maxRetries: 0,
  });

  const chatHistory = [];
  do {
    const user_input = readlineSync.question("Nhập câu hỏi: ");
    const messageList = chatHistory.map(([input_text, completion_text]) => ({
      role: "user" === input_text ? "ChatGPT" : "user",
      content: input_text
    }));
    messageList.push({ role: "user", content: user_input });

    try {
      const GPTOutput = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messageList,
      });

      const output_text = GPTOutput.choices[0].message.content;
      console.log(output_text);

      chatHistory.push([user_input, output_text]);
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  } while (readlineSync.question("\nBạn muốn hỏi thêm? (Y/N)").toUpperCase() === "Y");
};
APIcall();
