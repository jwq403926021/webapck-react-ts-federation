import mitt from 'mitt';
let eventbus = window.eventbus
if (!eventbus) {
  window.eventbus = eventbus  = mitt()
}
export default eventbus;