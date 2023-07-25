let form = document.getElementById("form");
let textarea2 = document.getElementById("textarea2");
let textauthor = document.getElementById("textauthor");
let textgender = document.getElementById("textgender");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let post = document.getElementById("post");
let closemodal = document.getElementById("closemodal");

//When the event click happens me remove the modal that he got
closemodal.addEventListener("click",() => {
    container.classList.remove("open-modal");
});


form.addEventListener("submit", (e) =>{
    e.preventDefault();
    formValidation();
});

const formValidation = () =>{
    if(textarea.value === ""){
        msg.innerHTML = "No introduzca un valor nulo";
    }
    else{
        msg.innerHTML = "";
        acceptData();
        container.classList.remove("open-modal");
    }
};

let data = {};

const acceptData = () =>{
    data["text"] = textarea.value;
    data["text2"] = textarea2.value;
    data["textauth"] = textauthor.value;
    data["textgen"] = textgender.value;
    createPost();
};

let i = 1;

const createPost = () => {
    post.innerHTML += `
    <div>
      <p class="mb-3">Juego ${i++}</p>
      <p class="mb-3">${data.text2}</p>
      <p class="mb-3">${data.textauth}</p>
      <p class="mb-3">${data.textgen}</p>
      <p class="mb-3">${data.text}</p>
      <span>
        <i onclick="editpost(this)" class="fas fa-edit"></i>
        <i onclick="deletepost(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `;
    textarea.value = "";
    textarea2.value = "";
    textauthor.value = "";
    textgender.value ="";
};

const editpost = (e) =>{
    textarea2.value = e.parentElement.previousElementSibling.innerHTML;
    textarea.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
    container.classList.add("open-modal");
};

const deletepost = (e) =>{
    e.parentElement.parentElement.remove();
};

const container = document.querySelector(".container");
const submit = document.getElementById("submit");
const boton = document.getElementById("boton_modal").addEventListener("click", () => {
    container.classList.add("open-modal");

});
