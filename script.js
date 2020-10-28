const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    fn: false,
    language: 'en'
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement("div");

    this.elements.main.classList.add('keyboard', "keyboard--hidden");
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__keys');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelector('.use-keyboard-input').addEventListener('focus', () => {
      this.open(element.value, currentValue => {
        element.value = currentValue;
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    
    const keyLayoutENlow = [
      "\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "\/", "up",
      "done", "EN", "mic", "Fn", "space", "win", "left", "down", "right"
    ];
    const keyLayoutENupp = [
      "\`", "!", "\@", "\#", "\$", "\%", "\^", "\&", "\*", "\(", "\)", "\_", "\+", "backspace",
      "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|",
      "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
      "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "\?", "up",
      "done", "EN", "mic", "Fn", "space", "win", "left", "down", "right"
    ];
    const keyLayoutRUlow = [
      "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up",
      "done", "RU", "mic", "Fn", "space", "win", "left", "down", "right"
    ];
    const keyLayoutRUupp = [
      "Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
      "tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\/",
      "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
      "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "up",
      "done", "RU", "mic", "Fn", "space", "win", "left", "down", "right"
    ];

    const createIcon = (iconName) => {
      return `<i class="material-icons">${iconName}</i>`;
    };

    keyLayoutENlow.forEach( key => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', '\\', 'enter', 'up'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIcon('backspace');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIcon('keyboard_tab');
          keyElement.addEventListener('click', () => {
            this.properties.value += '    ';
            this.triggerEvent('oninput');
          });
          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIcon('keyboard_capslock');
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
          });
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIcon('keyboard_return');
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });
          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIcon('keyboard_arrow_up');
          keyElement.addEventListener('click', () => {
            this.toggleShift();
            keyElement.classList.toggle('keyboard__key--active', this.properties.shift);            
          });
          break;

        case 'up':
          keyElement.innerHTML = createIcon('arrow_upward');
          keyElement.addEventListener('click', () => {
            
          });
          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIcon('check_circle');
          keyElement.addEventListener('click', () => {
            this.close();
            this.triggerEvent('onclose');
          });
          break;

        case 'EN':
          keyElement.innerHTML = '<span>EN</span>';
          keyElement.classList.add('language');
          keyElement.addEventListener('click', (e) => {
            this.toggleLanguage(e);
          });
          break;

        case 'mic':
          keyElement.innerHTML = createIcon('mic_off');
          keyElement.addEventListener('click', () => {
            
          });
          break;

        case 'Fn':
          keyElement.innerHTML = '<span>Fn</span>';
          keyElement.addEventListener('click', () => {
            
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIcon('space_bar');
          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });
          break;

        case 'win':
          keyElement.innerHTML = '<span class="iconify" data-icon="mdi-microsoft-windows"></span>'; //data-inline="false"
          keyElement.addEventListener('click', () => {
            
          });
          break;

        case 'left':
          keyElement.innerHTML = createIcon('arrow_back');
          keyElement.addEventListener('click', () => {
            
          });
          break;

        case 'down':
          keyElement.innerHTML = createIcon('arrow_downward');
          keyElement.addEventListener('click', () => {
            
          });
          break;

        case 'right':
          keyElement.innerHTML = createIcon('arrow_forward');
          keyElement.addEventListener('click', () => {
            
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  triggerEventR(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;
    for (const key of this.elements.keys) {
      
    }
  },

  toggleLanguage(e) {
    this.properties.language = this.properties.language === 'en' ? 'ru' : 'en';
    e.target.innerHTML = this.properties.language === 'en' ? '<span>EN</span>' : '<span>RU</span>';
    for (let i = 0; i < this.elements.keys.length; i++) {
      if (key.childElementCount === 0) {
        if (this.properties.shift) {
          switch(this.properties.language) {
            case 'en': 
              this.elements.keys[i].textContent = keyLayoutENupp[i];
              break;
            case 'ru':
              this.elements.keys[i].textContent = keyLayoutRUupp[i];
              break;
          }
        } else {
          switch(this.properties.language) {
            case 'en': 
              this.elements.keys[i].textContent = keyLayoutENlow[i];
              break;
            case 'ru':
              this.elements.keys[i].textContent = keyLayoutRUlow[i];
              break;
          }
        }
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.elements.main.classList.add('keyboard--hidden');
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});