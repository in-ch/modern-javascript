let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123, // "id": 123은 안됨
};
