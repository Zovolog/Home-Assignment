let inputData = document.querySelector(".getData");
let bt = document.querySelector(".bt-send-data");

let recordingList = document.querySelector(".input-part");

let validation = document.querySelector(".textValidation");
let infoServer = document.querySelector(".text-choosing-server");

let variantProxy = document.querySelector(".proxy");
let variantNonProxy = document.querySelector(".not-proxy");

function choosingServer(selectObject) {
  infoServer.textContent = selectObject.value;
}

bt.addEventListener("click", (e) => {
  if (
    !isNaN(inputData.value) &&
    inputData.value >= 5 &&
    inputData.value <= 20 &&
    (variantProxy.checked || variantNonProxy.checked)
  ) {
    if (variantProxy.checked) {
      for (let i = 0; i < inputData.value; i++) {
        fetch(`https://random-words-api.vercel.app/word`)
          .then(function (resp) {
            return resp.json();
          })
          .then(function (data) {
            fetch(
              `https://cors-anywhere.herokuapp.com/https://musicbrainz.org/ws/2/recording?query=${data[0].word}&limit=20&offset=0`,
              {
                headers: {
                  accept: "application/json",
                  origin: "*",
                  connection: "keep-alive"
                },
              }
            )
              .then(function (resp) {
                return resp.json();
              })
              .then(function (info) {
                if (info.count > 0) {
                  recordingList.insertAdjacentHTML(
                    "afterend",
                    `<div class="item-info">
                 <p> <span class="header">Word:</span>${data[0].word}</p>
                  <ul сlass="info-list">
                  <li><span class="header">Artist name:</span>${info.recordings[0]["artist-credit"][0].name}</li>
                  <li><span class="header">Album:</span>${info.recordings[0].releases[0].title}<li>
                  <li><span class="header">Title:</span>${info.recordings[0].title}</li>
                  </ul></div>`
                  );
                } else {
                  recordingList.insertAdjacentHTML(
                    "afterend",
                    `<div class="item-info"><div class="wrapping-info"><span><span class="header">Word:</span>${data[0].word} </span><span class="error">No recording found!</span></div></div>`
                  );
                }
              });
          });
      }
    } else if (variantNonProxy.checked && inputData.value <= 15) {
      for (let i = 0; i < inputData.value; i++) {
        fetch(`https://random-words-api.vercel.app/word`)
          .then(function (resp) {
            return resp.json();
          })
          .then(function (data) {
            fetch(
              `https://musicbrainz.org/ws/2/recording?query=${data[0].word}&limit=20&offset=0`,
              {
                headers: {
                  accept: "application/json",
                },
              }
            )
              .then(function (resp) {
                return resp.json();
              })
              .then(function (info) {
                if (info.count > 0) {
                  recordingList.insertAdjacentHTML(
                    "afterend",
                    `<div class="item-info">
                 <p> <span class="header">Word:</span>${data[0].word}</p>
                  <ul сlass="info-list">
                  <li><span class="header">Artist name:</span>${info.recordings[0]["artist-credit"][0].name}</li>
                  <li><span class="header">Album:</span>${info.recordings[0].releases[0].title}<li>
                  <li><span class="header">Title:</span>${info.recordings[0].title}</li>
                  </ul></div>`
                  );
                } else {
                  recordingList.insertAdjacentHTML(
                    "afterend",
                    `<div class="item-info"><div class="wrapping-info"><span><span class="header">Word:</span>${data[0].word} </span><span class="error">No recording found!</span></div></div>`
                  );
                }
              });
          });
      }
    }

    validation.textContent = "";
    infoServer.textContent = "";
  } else {
    validation.textContent = "Input data isn`t valid";
    infoServer.textContent = "You should choose type of server";
  }
});
