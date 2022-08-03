let inputData = document.querySelector(".getData");

let bt = document.querySelector(".bt-send-data");
let validation = document.querySelector(".textValidation");
let recordingList = document.querySelector(".input-part");
bt.addEventListener("click", (e) => {
  if (
    !isNaN(inputData.value) &&
    inputData.value >= 5 &&
    inputData.value <= 20
  ) {
    for (let i = 0; i < inputData.value; i++) {
      fetch(`https://random-words-api.vercel.app/word`)
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          fetch(
            `https://musicbrainz.org/ws/2/recording?query=${data[0].word}&limit=20&offset=0`,
            { headers: { accept: "application/json" } }
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

    validation.textContent = "";
  } else {
    validation.textContent = "Input data isn`t valid";
  }
});
