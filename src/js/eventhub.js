window.eventhub = {
  events: {},
  emit: function (eventname, data) {
    this.events[eventname] && this.events[eventname].map(fn => {
      fn(data)
    })
  },
  on: function (eventname, fn) {
    if(this.events[eventname]) {
      this.events[eventname].push(fn)
    } else {
      this.events[eventname] = [fn]
    }
  }
}