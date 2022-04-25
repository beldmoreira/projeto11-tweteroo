import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())

const users = []
const tweets = [];

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if (!username || !avatar) return res.status(400).send("Todos os campos são obrigatórios!");
    users.unshift({username, avatar});
    res.status(201).send("OK");
});

app.get("/tweets",(req,res)=> {

    let sendTweets = tweets.filter((data, index)=>{
      if(index > (tweets.length - 11)){
        return true;
      } else{
        return false;
      }
      
    });
    res.send(sendTweets.reverse());
  
  });

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    if (!username || !tweet) return res.sendStatus(422);
    const user = users.find(user => user.username===username);
    tweets.unshift({username, tweet, avatar: user.avatar});
    res.send("OK");
});


app.listen(5000);