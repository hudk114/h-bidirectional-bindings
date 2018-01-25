function Event (name) {
  this.name = name
  this.pool = []
}

Event.prototype = {
  constructor: Event,
  on (cb) {
    this.pool.push({
      cb
    })
  },
  once (cb) {
    this.pool.push({
      once: true,
      trigger: false,
      cb
    })
  },
  // TODO arguments
  trigger (...rest) {
    this.pool.forEach((e) => {
      if (e.once) {
        // TODO remove e
        if (e.trigger) {
        } else {
          e.cb.apply(e, rest)
          e.trigger = true
        }
      } else {
        e.cb.apply(e, rest)
      }
    })
  }
}

function Model (name) {
  this.name = name
  this.events = {}
}

Model.prototype = {
  constructor: Model,
  on (key, cb) {
    this.events[key] = this.events[key] || new Event(key)
    this.events[key].on(cb)
  },
  once (key, cb) {
    this.events[key] = this.events[key] || new Event(key)
    this.events[key].once(cb)
  },
  trigger (key, ...rest) {
    const event = this.events[key]
    event && event.trigger.apply(event, rest)
  }
}

export default Model
