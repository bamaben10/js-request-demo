console.log("connected");

// Step 1: Grab HTML elements
const getAllBtn = document.querySelector("#all");
const charBtns = document.querySelectorAll(".char-btns");
const ageForm = document.querySelector("#age-form");
const ageInput = document.querySelector("#age-input");
const createForm = document.querySelector("#create-form");
const newFirstInput = document.querySelector("#first");
const newLastInput = document.querySelector("#last");
const newGenderDropDown = document.querySelector("select");
const newAgeInput = document.querySelector("#age");
const newLikesText = document.querySelector("textarea");
const charContainer = document.querySelector("section");

const baseURL = `http://localhost:4000`;

// Step 2: Write your functions
function createCharacterCard(char) {
  let charCard = document.createElement("div");
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`;

  charContainer.appendChild(charCard);
}

function clearCharacters() {
  charContainer.innerHTML = ``;
}

function getAllChars() {
  clearCharacters();

  axios
    .get(`${baseURL}/characters`)
    .then((res) => {
      console.log(res);
      const characterArr = res.data;
      for (let i = 0; i < characterArr.length; i++) {
        createCharacterCard(characterArr[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function getOneChar(event) {
  clearCharacters();

  axios
    .get(`${baseURL}/character/${event.target.id}`)
    .then((res) => {
      console.log(res.data);
      const characterObj = res.data;
      createCharacterCard(characterObj);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getOldChars(event) {
  event.preventDefault();

  clearCharacters();

  axios
    .get(`${baseURL}/character/?age=${ageInput.value}`)
    .then((res) => {
      console.log(res.data);
      const oldCharactersArr = res.data;
      for (let i = 0; i < oldCharactersArr.length; i++) {
        createCharacterCard(oldCharactersArr[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function createNewChar(event) {
  event.preventDefault();

  clearCharacters();

  let newLikes = [...newLikesText.value.split(",")];
  console.log(newLikes);

  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes,
  };

  axios
    .post(`${baseURL}/character`, body)
    .then((res) => {
      const newArr = res.data;
      for (let i = 0; i < newArr.length; i++) {
        createCharacterCard(newArr[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Step 3: Assign event listeners
getAllBtn.addEventListener("click", getAllChars);

for (let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener("click", getOneChar);
}

ageForm.addEventListener("submit", getOldChars);

createForm.addEventListener("submit", createNewChar);

// const getAllChars = () => {
//   clearCharacters();
//   axios
//     .get(`${baseURL}/characters`)
//     .then((res) => {
//       console.log(res.data);
//       for (let i = 0; i < res.data.length; i++) {
//         createCharacterCard(res.data[i]);
//       }
//     })
//     .catch((error) => console.log(error));
// };

// const getOneChar = (evt) => {
//   clearCharacters();
//   console.log(evt.target.id);
//   axios
//     .get(`${baseURL}/character/${evt.target.id}`)
//     .then((res) => {
//       createCharacterCard(res.data);
//     })
//     .catch((err) => console.log(err));
// };

// const getOldChars = (event) => {
//   event.preventDefault();
//   clearCharacters();
//   axios
//     .get(`${baseURL}/character?age=${ageInput.value}`)
//     .then(function (res) {
//       res.data.map((character) => {
//         createCharacterCard(character);
//       });
//     })
//     .catch((err) => console.log(err));
// };

// const createNewChar = (evt) => {
//   evt.preventDefault();
//   clearCharacters();
//   const newLikes = [...newLikesText.value.split(",")];
//   let body = {
//     firstName: newFirstInput.value,
//     lastName: newLastInput.value,
//     gender: newGenderDropDown.value,
//     age: newAgeInput.value,
//     likes: newLikes,
//   };
//   axios
//     .post(`${baseURL}/character`, body)
//     .then((res) => {
//       res.data.map((char) => createCharacterCard(char));
//     })
//     .catch((err) => console.log(err));
// };

// getAllBtn.addEventListener("click", getAllChars);

// for (let i = 0; i < charBtns.length; i++) {
//   charBtns[i].addEventListener("click", getOneChar);
// }

// ageForm.addEventListener("submit", getOldChars);

// createForm.addEventListener("submit", createNewChar);
