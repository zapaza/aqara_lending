import $ from 'jquery';
import lottieWeb from "lottie-web";

class ItcTabs {
  constructor(target, config) {
    const defaultConfig = {};
    this._config = Object.assign(defaultConfig, config);
    this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
    this._elButtons = this._elTabs.querySelectorAll('.js-tabs-button');
    this._elPanes = this._elTabs.querySelectorAll('.js-tabs-pane');
    this._eventShow = new Event('tab.itc.change');
    this._init();
    this._events();
  }
  _init() {
    this._elTabs.setAttribute('role', 'tablist');
    this._elButtons.forEach((el, index) => {
      el.dataset.index = index;
      el.setAttribute('role', 'tab');
      this._elPanes[index].setAttribute('role', 'tabpanel');
    });
    console.log('init')
  }
  show(elLinkTarget) {
    const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
    const elLinkActive = this._elTabs.querySelector('.active');
    const elPaneShow = this._elTabs.querySelector('.show');
    if (elLinkTarget === elLinkActive) {
      return;
    }
    elLinkActive ? elLinkActive.classList.remove('active') : null;
    elPaneShow ? elPaneShow.classList.remove('show') : null;
    elLinkTarget.classList.add('active');
    elPaneTarget.classList.add('show');
    this._elTabs.dispatchEvent(this._eventShow);
    elLinkTarget.focus();
    console.log('show')
  }
  showByIndex(index) {
    const elLinkTarget = this._elButtons[index];
    elLinkTarget ? this.show(elLinkTarget) : null;
    console.log('showByIndex')
  }
  _events() {
    this._elTabs.addEventListener('click', (e) => {
      const target = e.target.closest('.js-tabs-button');
      if (target) {
        e.preventDefault();
        this.show(target);
      }
    });
    console.log('events')
    console.log(this._elTabs)
  }
}

new ItcTabs('.js-tabs');

let animation = lottieWeb.loadAnimation({
  container:   document.getElementById('container1'),
  path: document.getElementById('container1').dataset.animation,
  renderer: 'svg',
  loop: true,
  autoplay: true,
});

let animation2 = lottieWeb.loadAnimation({
  container:   document.getElementById('container2'),
  path: document.getElementById('container2').dataset.animation,
  renderer: 'svg',
  loop: true,
  autoplay: true,
});

