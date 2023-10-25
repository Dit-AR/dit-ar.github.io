let voices = [];
const synth = window.speechSynthesis;

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
}

function assistantIntroVoice() {
  populateVoiceList();
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

  if ("speechSynthesis" in window) {
    console.log("in if loop");
    let msg = `${greetMsg}. We are please to help you to resolve your issue, main samasya sulajhaane mein aapakee sahaayata karoonga`;
    const utterThis = new SpeechSynthesisUtterance(msg);
    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror", event);
    };

    utterThis.voice = voices[13];
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  } else {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
  }
}
