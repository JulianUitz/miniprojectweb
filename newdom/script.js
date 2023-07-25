document.addEventListener("DOMContentLoaded", function() {
  const addTaskBtn = document.getElementById("add-task-btn");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementsByClassName("close")[0];
  const form = document.getElementById("form");
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const dateInput = document.getElementById("date");
  const msg = document.getElementById("msg");
  const post = document.getElementById("post");
  const clearPostsBtn = document.getElementById("clear-posts-btn");

 
  addTaskBtn.addEventListener("click", function() {
    modal.style.display = "block";
    
  });

  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    formValidation();
  });

  clearPostsBtn.addEventListener("click", function() {
    post.innerHTML = "";
    localStorage.removeItem("posts");
  });

  const formValidation = () => {
    if (nameInput.value === "" || descriptionInput.value === "" || dateInput.value === "") {
      msg.innerHTML = "Todos los campos son obligatorios.";
    } else {
      msg.innerHTML = "";
      acceptData();
    }
  };

  const data = {};

  const acceptData = () => {
    data["name"] = nameInput.value;
    data["description"] = descriptionInput.value;
    data["date"] = dateInput.value;
    createPost();
  };

  const createPost = () => {
    post.innerHTML += `
      <div>
        <h4>${data.name}</h4>
        <p>${data.description}</p>
        <p>Fecha: ${data.date}</p>
        <span class="options">
          <i onclick="editpost(this)" class="fas fa-edit"></i>
          <i onclick="deletepost(this)" class="fas fa-trash-alt"></i>
        </span>
      </div>
      `;
    nameInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    modal.style.display = "none";
    guardarPostsEnLocalStorage();
  };

  window.editpost = (e) => {
    const postDiv = e.parentElement.parentElement;
    const name = postDiv.getElementsByTagName("h4")[0].innerText;
    const description = postDiv.getElementsByTagName("p")[0].innerText;
    const date = postDiv.getElementsByTagName("p")[1].innerText.split(": ")[1];

    nameInput.value = name;
    descriptionInput.value = description;
    dateInput.value = date;

    postDiv.remove();
    modal.style.display = "block";
    guardarPostsEnLocalStorage();
  };

  window.deletepost = (e) => {
    e.parentElement.parentElement.remove();
    guardarPostsEnLocalStorage();
  };
  const cargarPosts = () => {
    const postsGuardados = localStorage.getItem("posts");
    if (postsGuardados) {
      post.innerHTML = postsGuardados;
    }
  };

  const guardarPostsEnLocalStorage = () => {
    localStorage.setItem("posts", post.innerHTML);
  };
  cargarPosts();
});

