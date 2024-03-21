const express = require("express")
const OpenAI = require("openai")
const app=express();
var bodyParser=require("body-parser")

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.render("form", { 'answer' : '' });
});

app.post("/",async (req, res) => {
	var question = req.body.question;
  const openai = new OpenAI({
    apiKey: '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',
    maxRetries: 0,
  });
  const GPTOutput = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: question,
    }],
  });
  const output_text = GPTOutput.choices[0].message.content;
  res.render("form", { 'answer' : output_text });
});

app.listen(3003, function() {
	console.log('Server running on port 3003');
});
