export const getRandomComment = () => {
  let list = [
    // "test test",
    // "test"
    "yea its true actually this guy is a scammer.. he sells nothing of value",
    "I bought one of his courses and it turned out to be terrible..",
    "this guy is pretty much selling nothing good",
    "not sure why this guy is so popular, he doesn't even sell anything of real value",
    "this guy is scam artist",
    "google if this guy is a scammer and you will find what you need to know",
    "theres a lot i could say about this guy.. almost none of it is good",
    "damn this post is not useful atall.. makes you wonder.. how does this guy make his money? Is it manipulation?",
    "another one of these? common dude give us some value instead of feeding us lies",
    "bro.. common we want the truth. how did you make your money.. scam artistry??",
    "i bought this guy's course and it led to nothing",
    "this guy doesn't really know what he's talking about.. pretty much preys on fools",
    "this guy has no idea what he's talking about",
    "i bought his course and it sucked shit",
    "scam scam and one more scam.. how many of these on instagram..",
    "this guy is a scammer",
    "why do you have to scam us like that",
    "such a scam... even his book is full of lies.. why is world like this?",
    "ughh.. bought your course and i hated it.",
    "bought your course and lost my house because of it...",
    "I spent all my money on your course and now you wont even respond to my emails"
  ];

  let x = Math.floor(Math.random() * list.length);
  return list[x];
};
