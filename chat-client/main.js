import './style.css'



document.querySelector("#loginButton").onclick = () => {
  document.querySelector("#cover").style.display = "none";
  document.querySelector('#message-container').innerHTML = `
    <div><div class="message">Sample Message</div></div>
    <div><div class="message me">Sample Message</div></div>
    <div><div class="message me">Sample Message that is very long. Like very very very long. Okay maybe not that long, but certainly long enough to illustrate the point.</div></div>
    <div><div class="message">Sample Message</div></div>
    <div><div class="message me">Sample Message</div></div>
    <div><div class="message">Sample Message</div></div>
    <div><div class="message">Sample Message</div></div>
    <div><div class="message me">Sample Message</div></div>
    <div><div class="message">Sample Message</div></div>
    <div><div class="message me">Sample Message</div></div>
    <div><div class="message">Sample Message that is very long. Like very very very long. Okay maybe not that long, but certainly long enough to illustrate the point.</div></div>
    <div><div class="message me">Sample Message</div></div>
    <div><div class="message">Sample Message</div></div>
    <div><div class="message me">Sample Message</div></div>
    <div><div class="message">Sample Message</div></div>
    <div><div class="message me">Sample Message</div></div>
  `
  window.scrollTo(0,document.body.scrollHeight);
}