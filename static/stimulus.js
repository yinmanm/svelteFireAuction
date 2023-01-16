import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";
window.Stimulus = Application.start()

Stimulus.register("comp-dropdown", class extends Controller {
  static targets = ["menu", "option", "icon"];

  initialize() {
    this.toggleClass = this.data.get("class") || "hidden";
    this.toggleIconClass = this.data.get("icon-class") || "open";
    this.index = this.data.get("index") || -1;
    this.value = this.data.get("value") || 0;
  }
  connect() {
  }

  toggle() {
    this.menuTarget.classList.toggle(this.toggleClass);
    this.iconTarget.classList.toggle(this.toggleIconClass);
  }

  hide(e) {
    if (
      this.element.contains(e.target) === false &&
      !this.menuTarget.classList.contains(this.toggleClass)
    ) {
      this.menuTarget.classList.add(this.toggleClass);
      this.iconTarget.classList.remove(this.toggleIconClass);
    }
  }

  change(e) {
    this.index = this.optionTargets.indexOf(e.currentTarget);
    this.optionTargets.forEach((el, i) => {
      if (this.index == i) {
        this.value = el.getAttribute("data-value");
        this.menuTarget.classList.add(this.toggleClass);
        this.iconTarget.classList.remove(this.toggleIconClass);
      }
    });
  }
})

Stimulus.register("timedown", class extends Controller {
  static targets = ["time"];

  initialize() {
    this.endTime = this.data.get("end-time") || "";
    this.nowTime = new Date().getTime();
  }
  connect() {
    if (!this.endTime) {
      return;
    }
    if(this.endTime <= this.nowTime) {
      this.timeTarget.innerText = `completed at` + new Date(this.endTime).toLocalString;
      return;
    }
    this.startCount();
  }
  disconnect() {
    this.stopCount();
  }

  startCount() {
    let self = this;
    this.timeCount = (this.endTime - this.nowTime) / 1000;
    if(this.timeCount/60/60/24>1) {
      this.timeTarget.innerText = parseInt(this.timeCount/60/60/24) + " days, " + parseInt(this.timeCount/60/60%24) + " hours, " + parseInt(this.timeCount/60%60) + " mins";
    }
    else {
      this.timeTarget.innerText = parseInt(this.timeCount/60/60%24) + " hours, " + parseInt(this.timeCount/60%60) + " mins, " + parseInt(this.timeCount%60) + " secs";
    }
    setInterval(()=>{
      if(self.timeCount/60/60/24>1) {
        self.timeTarget.innerText = parseInt(self.timeCount/60/60/24) + " days, " + parseInt(self.timeCount/60/60%24) + " hours, " + parseInt(self.timeCount/60%60) + " mins";
      }
      else {
        self.timeTarget.innerText = parseInt(self.timeCount/60/60%24) + " hours, " + parseInt(self.timeCount/60%60) + " mins, " + parseInt(self.timeCount%60) + " secs";
      }
      self.timeCount =  self.timeCount - 1;
      if(self.timeCount <1) {
        this.timeTarget.innerText = `completed at` + this.endTime.toLocalString;
        return;
      }
    },1000);
  }

  stopCount() {
    if (this.timeoutID) {
      window.clearTimeout(this.timeoutID);
      delete this.timeoutID;
    }
  }

})


