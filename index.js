document.addEventListener("DOMContentLoaded", () => {
  const navoptions = document.getElementById("navOptions");
  navoptions.style.display = "none";
  navoptions.hidden = false;
  const login = document.getElementById("user-login");
  const signup = document.getElementById("user-create");
  const replaceable = document.getElementById("title-deep");
  let loggedInUser = false;
  let loggedInUserId = false;
  let allUsers = false;
  handleLogin();
  HandleSignup();

  function navButtons() {
    document
      .getElementById("logout-button")
      .addEventListener("click", function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        location.reload();
      });
    navoptions.style.display = "flex";
  }

  function refreshUser() {
    fetch(`http://localhost:3000/users/${loggedInUserId}`)
      .then((resp) => resp.json())
      .then((json) => {
        loggedInUserId = json.data.id;
        loggedInUser = json.data.attributes;
        buildAccountPage();
      });
  }

  function handleLogin() {
    login.addEventListener("submit", (e) => {
      e.preventDefault();
      let loginData = e.target.username.value;
      getUsers(loginData);
    });

    function getUsers(loginData) {
      fetch("http://localhost:3000/users")
        .then((resp) => resp.json())
        .then((json) => findUser(json, loginData));
    }

    function findUser(json, loginData) {
      allUsers = json;
      json.forEach((user) => {
        if (user.username == loginData) {
          return (loggedInUser = user);
        }
      });

      if (!loggedInUser) {
        alert("That User Does Not Exist, Please Create An Account.");
      } else {
        navButtons();
        document.getElementById("user").innerText = loggedInUser.id;
        loggedInUserId = loggedInUser.id;
        refreshUser();
      }
    }
  }

  function HandleSignup() {
    signup.addEventListener("submit", (e) => {
      e.preventDefault();
      postUser(e);
    });

    function postUser(e) {
      const data = {
        username: e.target.username.value,
        name: e.target.name.value,
      };
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch("http://localhost:3000/users", configObj)
        .then((resp) => resp.json())
        .then((json) => {
          navButtons();
          loggedInUserId = json.data.id;
          loggedInUser = json.data.attributes;
          document.getElementById("user").innerText = loggedInUser.id;
          fetch("http://localhost:3000/users")
            .then((resp) => resp.json())
            .then((json) => {
              allUsers = json;
              refreshUser();
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  function buildAccountPage() {
    document.body.className = "body_1 border-light";
    replaceable.className = "card_1 ";
    replaceable.innerHTML = accountPage();
    document.querySelector(".display-name").innerText = loggedInUser.username;

    document
      .getElementById("delete-account")
      .addEventListener("click", function () {
        if (
          confirm(
            "Are you sure you wish to delete your account and all of its data?"
          )
        ) {
          deleteUser();
        }
      });

    function addPhotoToCollection(image) {
      if (!!image.url) {
        const album = document.getElementById("photo-collection");
        const div = document.createElement("div");
        div.className = "album-card";
        const div2 = document.createElement("div");
        div2.className = "image";
        const img = document.createElement("img");
        img.src = image.url;
        img.className = "pic";
        const name = document.createElement("p");
        name.innerText = image.name;
        div2.appendChild(img);
        div2.appendChild(name);
        div.appendChild(div2);
        album.appendChild(div);
      }
    }

    function addFridgeToCollection(fridge) {
      const album = document.getElementById("fridge-collection");
      const div = document.createElement("div");
      div.className = "album-card";
      const div2 = document.createElement("div");
      const name = document.createElement("p");
      name.innerText = fridge.name;
      const img = document.createElement("img");
      img.addEventListener("click", function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        buildFridgePage(fridge.id);
      });
      div2.className = "image";
      img.src =
        "https://images.homedepot-static.com/productImages/5abd73e7-0790-4ab4-aa99-acd64ed909cc/svn/red-magic-chef-mini-fridges-hmcr320re-64_1000.jpg";
      img.className = "fridge pointer";
      div2.appendChild(img);
      div2.appendChild(name);
      div.appendChild(div2);
      album.appendChild(div);
    }

    function deleteUser() {
      fetch(`http://localhost:3000/users/${loggedInUserId}`, {
        method: "DELETE",
      }).then(location.reload());
    }
  }
});
