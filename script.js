const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const screenKeyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    layouts: [],
    recognition: null
  },

  eventHandlers: {
    oninput(currentValue) {
      input.setRangeText(currentValue, input.selectionStart, input.selectionEnd, 'end');
      input.focus();
      return;
		}
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    fn: false,
    language: true,
    mic: false,
    mute: false,
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

    document.querySelector('html').addEventListener('click', () => {
      input.focus();
    });
    input.addEventListener('click', () => {
      this.open(input.value);
    });
    input.addEventListener('focus', () => {
      this.open(input.value);
    });
    document.querySelector('.keyboard').setAttribute("onmousedown", "return false");

    this.elements.recognition = new SpeechRecognition();
    this.elements.recognition.interimResults = true;
    this.elements.recognition.lang = 'en-US';
    this.elements.recognition.continuous = true;

    // input.addEventListener('keydown', (e) => {
    //   console.clear();
    //   console.log(e.keyCode, e.key);
    //   console.log(e);
    // });
		
    this.open(input.value);
      // input.focus();
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    
    this.elements.layouts[1] = [
      "\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "\/", "up",
      "done", "EN", "mic", "space", "mute", "left", "down", "right"
    ];
    this.elements.layouts[3] = [
      "\`", "!", "\@", "\#", "\$", "\%", "\^", "\&", "\*", "\(", "\)", "\_", "\+", "backspace",
      "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|",
      "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
      "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "\?", "up",
      "done", "EN", "mic", "space", "mute", "left", "down", "right"
    ];
    this.elements.layouts[0] = [
      "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up",
      "done", "RU", "mic", "space", "mute", "left", "down", "right"
    ];
    this.elements.layouts[2] = [
      "Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
      "tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\/",
      "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
      "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "up",
      "done", "RU", "mic", "space", "mute", "left", "down", "right"
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
            if (input.selectionStart == input.selectionEnd) {
              input.selectionStart = 0;
              this.properties.value = input.value.slice(0, input.selectionEnd).substring(0, input.selectionEnd - 1);
            } else this.properties.value = '';
            this.triggerEvent('oninput');
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'Backspace') {
              e.preventDefault();
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          });
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIcon('keyboard_tab');
          keyElement.addEventListener('click', () => {
            this.properties.value = '  ';
            this.triggerEvent('oninput');
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          });
          break;
          break;

        case 'caps':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.id = 'caps';
          keyElement.innerHTML = createIcon('keyboard_capslock');
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            input.focus();
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'CapsLock') {
              e.preventDefault();
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          }); 
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIcon('keyboard_return');
          keyElement.addEventListener('click', () => {
            this.properties.value = '\n';
            this.triggerEvent('oninput');
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          }); 
          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.id = 'shift';
          keyElement.innerHTML = createIcon('keyboard_arrow_up');
          keyElement.addEventListener('click', () => {
            this.toggleShift();
            input.focus();
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'Shift') {
              e.preventDefault();
              if (!screenKeyboard.properties.shift) {
                keyElement.click();
                keyElement.classList.add('click');
                setTimeout(() => keyElement.classList.remove('click'), 100);
              }
            }
          });

          input.addEventListener("keyup", (e) => {
            if (e.key === 'Shift') {
              e.preventDefault();
              if (screenKeyboard.properties.shift) {
                keyElement.click();
                keyElement.classList.add('click');
                setTimeout(() => keyElement.classList.remove('click'), 100);
              }
            }
          });
          break;

        case 'up':
          keyElement.innerHTML = createIcon('arrow_upward');
          keyElement.addEventListener('click', () => {
            
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'ArrowUp') {
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          }); 
          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIcon('check_circle');
          keyElement.addEventListener('click', (event) => {
            this.close(event);
          });
          break;

        case 'EN':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = '<span>EN</span>';
          keyElement.classList.add('language');
          keyElement.addEventListener('click', (e) => {
            this.properties.language = !this.properties.language;
            this.toggleLanguage(e);
            input.focus();
          });
          break;

        case 'mic':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIcon('mic_off');
          keyElement.addEventListener('click', () => {
            this.properties.mic = !this.properties.mic;
            keyElement.innerHTML = this.properties.mic ? createIcon('mic') : createIcon('mic_off');
            keyElement.classList.toggle('keyboard__key--active', this.properties.mic);
            this.toggleMic(this.properties.mic);
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIcon('space_bar');
          keyElement.addEventListener('click', () => {
            this.properties.value = ' ';
            this.triggerEvent('oninput');
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === ' ') {
              e.preventDefault();
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          });
          break;

        case 'mute':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIcon('volume_up');
          keyElement.addEventListener('click', () => {
            this.toggleMute();
            this.properties.mute = !this.properties.mute;
            keyElement.innerHTML = this.properties.mute ? createIcon('volume_off') : createIcon('volume_up');
            keyElement.classList.toggle('keyboard__key--active', this.properties.mute);
          });
          break;

        case 'left':
          keyElement.innerHTML = createIcon('arrow_back');
          keyElement.addEventListener('click', () => {
            this.left();
            input.focus();
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          });
          break;

        case 'down':
          keyElement.innerHTML = createIcon('arrow_downward');
          keyElement.addEventListener('click', () => {

          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'ArrowDown') {
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          }); 
          break;

        case 'right':
          keyElement.innerHTML = createIcon('arrow_forward');
          keyElement.addEventListener('click', () => {
            this.right();
            input.focus();
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value = keyElement.textContent;
            this.triggerEvent("oninput");
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === keyElement.textContent) {
              e.preventDefault();
              keyElement.click();
              keyElement.classList.add('click');
              setTimeout(() => keyElement.classList.remove('click'), 100);
            }
          });
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
    e.target.innerHTML = this.properties.language ? '<span>EN</span>' : '<span>RU</span>';
		this.properties.layoutCounter += this.properties.language  ? 1 : -1;
    this.elements.recognition.lang = this.properties.language ? 'en-US' : 'ru-RU';
		this.updateKeyboard();
  },
	
	updateKeyboard() {
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
  
  left() {
    if (this.properties.shift) {
      if (input.selectionDirection == 'backward') {
        input.selectionStart--;
      } else {
        input.selectionEnd--;
      }
    } else {
      input.selectionStart = --input.selectionEnd;
    }
  },

  right() {
    if (this.properties.shift) {
      if (input.selectionDirection == 'backward') {
        input.selectionStart++;
      } else {
        input.selectionEnd++;
      }
    } else {
      input.selectionStart = ++input.selectionEnd;
    }
  },

  toggleMic(e) {
    if (e) {
      this.elements.recognition.addEventListener('end', this.elements.recognition.start);
    } else {
      this.elements.recognition.removeEventListener('end', this.elements.recognition.start);
    }
    e ? this.elements.recognition.start() : this.elements.recognition.stop();
    this.elements.recognition.lang = this.properties.language ? 'en-US' : 'ru-RU';
    this.elements.recognition.addEventListener('result', event => {
      if (event.results[0].isFinal) {
        this.properties.value = event.results[0][0].transcript;
        this.triggerEvent('oninput');
      }
    });    
  },

  toggleMute() {

  },

  open(initialValue) {
    input.placeholder = 'Start typing';
    this.properties.value = initialValue || '';
    this.elements.main.classList.remove('keyboard--hidden');
    input.focus();
  },

  close(e) {
    input.placeholder = 'Click anywhere';
    this.properties.value = '';
    this.elements.main.classList.add('keyboard--hidden');
    e.stopPropagation();
  }
};

window.addEventListener("DOMContentLoaded", function () {
  screenKeyboard.init();
});