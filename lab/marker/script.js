function assistantIntroVoice() {
  console.log("assistantIntroVoice....");
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
    let msg = new SpeechSynthesisUtterance();
    // msg.voice = voices[10];
    // msg.volume = 1; // From 0 to 1
    // msg.rate = 1; // From 0.1 to 10
    // msg.pitch = 2; // From 0 to 2
    msg.lang = "hi-IN";
    msg.text = `Namaskar, may aj apko tab repair karneka tharika sikathayu`;
    window.speechSynthesis.speak(msg);
  } else {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
  }
}
