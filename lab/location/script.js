window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  button.innerText = "﹖";

  let today = new Date();
  let curHr = today.getHours();
  let greetMsg = "";
  if (curHr < 12) {
    greetMsg = "good morning";
  } else if (curHr < 18) {
    greetMsg = "good afternoon";
  } else {
    greetMsg = "good evening";
  }

  let places = staticLoadPlaces();
  renderPlaces(places);

  if ("speechSynthesis" in window) {
    let msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[10];
    // msg.volume = 1; // From 0 to 1
    // msg.rate = 1; // From 0.1 to 10
    // msg.pitch = 2; // From 0 to 2
    // msg.lang = "en";
    msg.text = `Hi, ${greetMsg}, how can i help you today.`;
    window.speechSynthesis.speak(msg);
  } else {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
  }
};

function staticLoadPlaces() {
  let currentPosition = { latitude: "", longitude: "" };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      currentPosition.latitude = latitude;
      currentPosition.longitude = longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      document.getElementById(
        "help-text"
      ).innerText = `Latitude: ${currentPosition.latitude}, Longitude: ${currentPosition.longitude}`;
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  return [
    {
      name: "AR Assistant",
      location: {
        lat: 13.081206160268227,
        lng: 77.64014750889895
      }
    }
  ];
}

var models = [
  {
    url: "./assets/magnemite/scene.gltf",
    scale: "0.5 0.5 0.5",
    info: "Magnemite, Lv. 5, HP 10/10",
    rotation: "0 180 0"
  },
  {
    url: "./assets/articuno/scene.gltf",
    scale: "0.2 0.2 0.2",
    rotation: "0 180 0",
    info: "Articuno, Lv. 80, HP 100/100"
  },
  {
    url: "./assets/dragonite/scene.gltf",
    scale: "0.08 0.08 0.08",
    rotation: "0 180 0",
    info: "Dragonite, Lv. 99, HP 150/150"
  },
  {
    url: "./assets/taps/scene.gltf",
    scale: "0.5 0.5 0.5",
    rotation: "0 180 0",
    info: "Tap, Lv. 99, HP 150/150"
  }
];

var modelIndex = 0;
var setModel = function (model, entity) {
  if (model.scale) {
    entity.setAttribute("scale", model.scale);
  }

  if (model.rotation) {
    entity.setAttribute("rotation", model.rotation);
  }

  if (model.position) {
    entity.setAttribute("position", model.position);
  }

  entity.setAttribute("gltf-model", model.url);

  const div = document.querySelector(".instructions");
  div.innerText = model.info + model.position;
};

function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach((place) => {
    let latitude = place.location.lat;
    let longitude = place.location.lng;

    let model = document.createElement("a-entity");
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );

    setModel(models[modelIndex], model);

    model.setAttribute("animation-mixer", "");

    document
      .querySelector('button[data-action="change"]')
      .addEventListener("click", function () {
        var entity = document.querySelector("[gps-entity-place]");
        modelIndex++;
        var newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
      });

    scene.appendChild(model);
  });
}
