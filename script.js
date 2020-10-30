const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    layouts: []
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
    language: true,
		layoutCounter: 1
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement("div");

    this.elements.main.classList.add('keyboard', "keyboard--hidden");
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelector('.use-keyboard-input').addEventListener('focus', (e) => {
      this.open(e.target.value, currentValue => {
        e.target.value = currentValue;
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    
    this.elements.layouts[1] = [
      "\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "\/", "up",
      "done", "EN", "mic", "space", "win", "left", "down", "right"
    ];
    this.elements.layouts[3] = [
      "\`", "!", "\@", "\#", "\$", "\%", "\^", "\&", "\*", "\(", "\)", "\_", "\+", "backspace",
      "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|",
      "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
      "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "\?", "up",
      "done", "EN", "mic", "space", "win", "left", "down", "right"
    ];
    this.elements.layouts[0] = [
      "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up",
      "done", "RU", "mic", "space", "win", "left", "down", "right"
    ];
    this.elements.layouts[2] = [
      "Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
      "tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\/",
      "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
      "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "up",
      "done", "RU", "mic", "space", "win", "left", "down", "right"
    ];

    const createIcon = (iconName) => {
      return `<i class="material-icons">${iconName}</i>`;
    };

    this.elements.layouts[1].forEach( key => {
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
          keyElement.id = 'caps';
          keyElement.innerHTML = createIcon('keyboard_capslock');
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
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
          keyElement.id = 'shift';
          keyElement.innerHTML = createIcon('keyboard_arrow_up');
          keyElement.addEventListener('click', () => {
            this.toggleShift();
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
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = '<span>EN</span>';
          keyElement.classList.add('language');
          keyElement.addEventListener('click', (e) => {
            this.properties.language = !this.properties.language;
            this.toggleLanguage(e);
          });
          break;

        case 'mic':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIcon('mic_off');
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
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = '<span class="iconify" data-icon="mdi-microsoft-windows"></span>';
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
            // this.properties.value += this.properties.capsLock ^ this.properties.shift ? keyElement.textContent.toUpperCase() : keyElement.textContent.toLowerCase();
            this.properties.value += keyElement.textContent;
            this.triggerEvent("oninput");
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

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
		this.updateKeyboard();
    caps.classList.toggle('keyboard__key--active', this.properties.capsLock);
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;
		this.properties.layoutCounter += this.properties.shift  ? 2 : -2;
		this.updateKeyboard();
    shift.classList.toggle('keyboard__key--active', this.properties.shift);
  },

  toggleLanguage(e) {
    e.target.innerHTML = this.properties.language  ? '<span>EN</span>' : '<span>RU</span>';
		this.properties.layoutCounter += this.properties.language  ? 1 : -1;
		this.updateKeyboard();
  },
	
	updateKeyboard() {
		console.log(this.properties.layoutCounter);
		switch(this.properties.layoutCounter) {
			case 1:
				for (let i = 0; i < this.elements.keys.length; i++) {
					if (this.elements.keys[i].childElementCount === 0) {
						this.elements.keys[i].textContent = this.properties.capsLock ? this.elements.layouts[1][i].toUpperCase() : this.elements.layouts[1][i].toLowerCase();
					}
				}
				break;

			case 3:
				for (let i = 0; i < this.elements.keys.length; i++) {
					if (this.elements.keys[i].childElementCount === 0) {
						this.elements.keys[i].textContent = !this.properties.capsLock ? this.elements.layouts[3][i].toUpperCase() : this.elements.layouts[3][i].toLowerCase();
					}
				}
				break;

			case 0:
				for (let i = 0; i < this.elements.keys.length; i++) {
					if (this.elements.keys[i].childElementCount === 0) {
						this.elements.keys[i].textContent = this.properties.capsLock ? this.elements.layouts[0][i].toUpperCase() : this.elements.layouts[0][i].toLowerCase();
					}
				}
				break;

			case 2:
				for (let i = 0; i < this.elements.keys.length; i++) {
					if (this.elements.keys[i].childElementCount === 0) {
						this.elements.keys[i].textContent = !this.properties.capsLock ? this.elements.layouts[2][i].toUpperCase() : this.elements.layouts[2][i].toLowerCase();
					}
				}
				break;
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