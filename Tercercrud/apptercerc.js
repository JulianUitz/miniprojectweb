const form = document.getElementById("form");
    const textarea2 = document.getElementById("textarea2");
    const textauthor = document.getElementById("textauthor");
    const textgender = document.getElementById("textgender");
    const textarea = document.getElementById("textarea");
    const msg = document.getElementById("msg");
    const post = document.getElementById("post");
    const closemodal = document.getElementById("closemodal");

    closemodal.addEventListener("click", () => {
      container.classList.remove("open-modal");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      formValidation();
    });

    const formValidation = () => {
      if (textarea.value === "") {
        msg.innerHTML = "No introduzca un valor nulo";
      } else {
        msg.innerHTML = "";
        acceptData();
        container.classList.remove("open-modal");
      }
    };

    let i = 0;
    let posts = [];
    window.addEventListener("load", () => {
      loadPostsFromLocalStorage();
    });

    const loadPostsFromLocalStorage = () => {
      const storedPosts = JSON.parse(localStorage.getItem("posts"));
      if (storedPosts) {
        i = storedPosts.length + 1;
        storedPosts.forEach((storedPost) => {
          createPost(storedPost);
        });
      }
    };

    const savePostsToLocalStorage = () => {
      localStorage.setItem("posts", JSON.stringify(posts));
    };

    const acceptData = () => {
      const data = {
        text: textarea.value,
        text2: textarea2.value,
        textauth: textauthor.value,
        textgen: textgender.value,
      };
      createPost(data);
    };

    const createPost = (data) => {
        const postContent = `
            <div>
                <p class="mb-3">LIBRO: ${i++}</p>
                <p class="mb-3">${data.text2}</p>
                <p class="mb-3">${data.textauth}</p>
                <p class="mb-3">${data.textgen}</p>
                <p class="mb-3">${data.text}</p>
                <span>
                    <i onclick="editpost(this)" class="fa-solid fa-pen-to-square"></i>
                    <i onclick="deletepost(this)" class="fas fa-trash-alt"></i>
                </span>
            </div>
        `;

        post.innerHTML += postContent;

        posts.push(data);
        savePostsToLocalStorage();

        textarea.value = "";
        textarea2.value = "";
        textauthor.value = "";
        textgender.value = "";
    };

    const editpost = (e) => {
      textarea2.value = e.parentElement.previousElementSibling.innerHTML;
      textarea.value = e.parentElement.previousElementSibling.innerHTML;
      e.parentElement.parentElement.remove();
      container.classList.add("open-modal");
    };

    const deletepost = (e) => {
      e.parentElement.parentElement.remove();
      const postIndex = Array.from(post.children).indexOf(e.parentElement.parentElement);
      posts.splice(postIndex, 1);
      i--;
      savePostsToLocalStorage();
    };

    const container = document.querySelector(".container");
    const submit = document.getElementById("submit");
    const boton = document.getElementById("boton_modal").addEventListener("click", () => {
      container.classList.add("open-modal");
    });

    