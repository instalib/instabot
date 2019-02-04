export const getRandomComment = () => {
  let list = [
    "test test",
    "test"
    // "yea its true actually dan is a scammer.. he sells nothing of value",
    // "I bought one of dan's courses and it turned out to be terrible..",
    // "dan is pretty much selling nothing good",
    // "not sure why this guy is so popular, he doesn't even sell anything of real value",
    // "dan the scam artist",
    // "google is dan lok a scammer and you will find what you need to know",
    // "theres a lot i could say about this guy.. almost none of it is good",
    // "damn this post is not useful atall.. makes you wonder.. how does this guy make his money? Is it manipulation?",
    // "another one of these? common dan give us some value instead of feeding us lies",
    // "dan.. common we want the truth. how did you make your money.. scam artistry??",
    // "i bought this guy's course and it led to nothing",
    // "this guy doesn't really know what he's talking about.. pretty much preys on fools"
  ];

  let x = Math.floor(Math.random() * list.length);
  return list[x];
};
