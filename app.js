//  selector

const app = document.querySelector("#app");
const dataInput = document.querySelector("#dataInput");
const textInput = document.querySelector("#textInput");
const addBtn = document.querySelector("#addBtn");
const lists = document.querySelector(".lists");
const totalList = document.querySelector("#totalList");
const doneCount = document.querySelector("#doneCount");
const createForm = document.querySelector("#createForm");
const allDone = document.querySelector("#allDone");

let listIndex = 0 ;
// functions

const countList = () => {
  let total = document.querySelectorAll(".list").length;
  totalList.innerText = total;
  return total;
};

const doneList = () => {
  let total = document.querySelectorAll(".form-check-input:checked").length;
  doneCount.innerText = total;
  return total;
};

const createList = (text) => {
  const list = document.createElement("div");
  const id = "list"+ listIndex++;

  list.className = "list";
  list.innerHTML = `
   <div class="border border-2 border-black p-3 d-flex justify-content-between align-items-center animate__animated animate__zoomInLeft mb-3">
    <div class="form-check ">
        <input type="checkbox" id="${id}" class="form-check-input">
        <label for="${id}"" class="form-check-label"> ${text}</label>
    </div>

     <div class="controls">
        <button class="bi bi-pencil-fill btn list-edit-btn btn-outline-primary btn-sm"></button>
        <button class="bi bi-trash3-fill btn list-del-btn btn-outline-primary btn-sm "></button>
     </div>
</div>`;

  const listDelBtn = list.querySelector(".list-del-btn");
  listDelBtn.addEventListener("click", (e) => {
    //   // console.log(e.target);
    //   if (confirm("Are you sure to delete this list ?")) {
    //
    //   }

    
    console.log(list.children[0]);
    list.children[0].classList.replace(
      "animate__zoomInLeft",
      "animate__fadeOutRight"
      );
      
      list.children[0].addEventListener("animationend", ()=>{
      list.remove();
      countList();
      doneList();
    })
  });

  const label = list.querySelector(".form-check-label");

  const listEditBtn = list.querySelector(".list-edit-btn");

  listEditBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.classList.add("form-control");
    input.value = text;

    label.innerHTML = null;
    label.append(input);
    input.focus()

    input.addEventListener("blur", () => {
      label.innerText = input.value;
    });
  });

  const check = list.querySelector(".form-check-input");
  check.addEventListener("click", () => {
    doneList();
    label.classList.toggle("text-decoration-line-through");
    list.querySelector(".list-edit-btn").toggleAttribute("disabled");
  });

  return list;
};

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  lists.append(createList(textInput.value)); 
  textInput.value = null;
  countList();
  doneList();
});

 allDone.addEventListener("click",()=>{
  const allList = document.querySelectorAll(".list");
  allList.forEach(list => {
    list.querySelector(".form-check-input").click();
  })
 })
// process
// addBtn.addEventListener("click", () => {
//   //   console.log(textInput.value);
//   lists.append(createList(textInput.value));
//   textInput.value = null;
//   countList();
//   doneList();
// });

// textInput.addEventListener("keyup", (e) => {
//   if (e.key === "Enter") {
//     lists.append(createList(textInput.value));
//     textInput.value = null;
//     countList();
//     doneList();
//   }
// });
