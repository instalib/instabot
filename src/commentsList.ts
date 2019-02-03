export const getRandomComment = () => {
  let list = ["dan the man", "unfortunately, dan is not selling anything good"];

  let x = Math.floor(Math.random() * list.length);
  return list[x];
};

let ok = getRandomComment();
console.log(ok);
