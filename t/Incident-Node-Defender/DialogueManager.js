class DialogueManager {
  /**
   * Initialize the Dialogue Manager
   * @param {Array} dialogues - Array of dialogue objects { speakerName, side, text, avatarUrl, color }
   * @param {Function} onComplete - Callback when dialogue finishes or is skipped
   */
  constructor(dialogues, onComplete) {
    this.dialogues = dialogues;
    this.onComplete = onComplete;
    this.currentIndex = 0;
    this.isTyping = false;
    this.typewriterInterval = null;
    this.typeSpeed = 25; // ms per char

    this.initDOM();
    this.attachEvents();
    
    // Add visible class after a short delay to trigger CSS transition
    setTimeout(() => {
      this.overlay.classList.add('vn-visible');
      this.showDialogue(this.currentIndex);
    }, 50);
  }

  initDOM() {
    // Container
    this.overlay = document.createElement('div');
    this.overlay.className = 'vn-overlay';
    
    // Skip Button
    this.skipBtn = document.createElement('button');
    this.skipBtn.className = 'vn-skip-btn';
    this.skipBtn.textContent = 'Skip Intro';
    
    // Stage (Avatars)
    this.stage = document.createElement('div');
    this.stage.className = 'vn-stage';
    
    this.leftAvatar = document.createElement('div');
    this.leftAvatar.className = 'vn-avatar-container vn-left';
    this.leftImg = document.createElement('img');
    this.leftImg.className = 'vn-avatar';
    this.leftAvatar.appendChild(this.leftImg);
    
    this.rightAvatar = document.createElement('div');
    this.rightAvatar.className = 'vn-avatar-container vn-right';
    this.rightImg = document.createElement('img');
    this.rightImg.className = 'vn-avatar';
    this.rightAvatar.appendChild(this.rightImg);
    
    this.stage.appendChild(this.leftAvatar);
    this.stage.appendChild(this.rightAvatar);
    
    // Dialogue Box
    this.dialogueBox = document.createElement('div');
    this.dialogueBox.className = 'vn-dialogue-box';
    
    this.nameBadge = document.createElement('div');
    this.nameBadge.className = 'vn-name-badge';
    
    this.textContainer = document.createElement('div');
    this.textContainer.className = 'vn-text';
    
    this.nextIndicator = document.createElement('div');
    this.nextIndicator.className = 'vn-next-indicator';
    
    this.dialogueBox.appendChild(this.nameBadge);
    this.dialogueBox.appendChild(this.textContainer);
    this.dialogueBox.appendChild(this.nextIndicator);
    
    // Append all
    this.overlay.appendChild(this.skipBtn);
    this.overlay.appendChild(this.stage);
    this.overlay.appendChild(this.dialogueBox);
    
    document.body.appendChild(this.overlay);
  }

  attachEvents() {
    this.skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.endDialogue();
    });

    this.overlay.addEventListener('click', () => {
      if (this.isTyping) {
        this.completeTyping();
      } else {
        this.advance();
      }
    });
  }

  showDialogue(index) {
    if (index >= this.dialogues.length) {
      this.endDialogue();
      return;
    }

    const curr = this.dialogues[index];
    
    // Update Name Badge
    this.nameBadge.textContent = curr.speakerName;
    if (curr.color) {
      this.nameBadge.style.backgroundColor = curr.color;
      this.nameBadge.style.boxShadow = `0 4px 6px -1px ${curr.color}4d`; // 30% opacity shadow
    } else {
      const defaultColor = curr.side === 'left' ? '#3b82f6' : '#8b5cf6';
      this.nameBadge.style.backgroundColor = defaultColor;
      this.nameBadge.style.boxShadow = `0 4px 6px -1px ${defaultColor}4d`;
    }

    // Update Avatars
    if (curr.side === 'left') {
      this.leftAvatar.classList.add('vn-active', 'vn-present');
      this.rightAvatar.classList.remove('vn-active');
      
      // Keep right present if it has an image
      if (this.rightImg.src || this.rightImg.classList.contains('vn-avatar-placeholder')) {
        this.rightAvatar.classList.add('vn-present');
      }
      
      this.setAvatarImage(this.leftImg, curr.avatarUrl, curr.color || '#3b82f6');
    } else if (curr.side === 'right') {
      this.rightAvatar.classList.add('vn-active', 'vn-present');
      this.leftAvatar.classList.remove('vn-active');
      
      // Keep left present if it has an image
      if (this.leftImg.src || this.leftImg.classList.contains('vn-avatar-placeholder')) {
        this.leftAvatar.classList.add('vn-present');
      }
      
      this.setAvatarImage(this.rightImg, curr.avatarUrl, curr.color || '#8b5cf6');
    } else {
      // Narrator mode (both dimmed)
      this.leftAvatar.classList.remove('vn-active');
      this.rightAvatar.classList.remove('vn-active');
    }

    this.nextIndicator.classList.remove('vn-visible');
    this.startTyping(curr.text);
  }

  setAvatarImage(imgElement, url, color) {
    if (url) {
      imgElement.src = url;
      imgElement.classList.remove('vn-avatar-placeholder');
      imgElement.style.background = 'none';
    } else {
      // Create a nice colored placeholder if no URL is provided
      imgElement.removeAttribute('src');
      imgElement.classList.add('vn-avatar-placeholder');
      imgElement.style.background = `linear-gradient(135deg, ${color}33, ${color})`;
    }
  }

  startTyping(text) {
    this.isTyping = true;
    this.textContainer.innerHTML = '';
    let i = 0;
    clearInterval(this.typewriterInterval);
    
    this.typewriterInterval = setInterval(() => {
      this.textContainer.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) {
        this.completeTyping(text);
      }
    }, this.typeSpeed);
  }

  completeTyping(text) {
    clearInterval(this.typewriterInterval);
    this.isTyping = false;
    if (text) {
        this.textContainer.innerHTML = text;
    } else {
        this.textContainer.innerHTML = this.dialogues[this.currentIndex].text;
    }
    this.nextIndicator.classList.add('vn-visible');
  }

  advance() {
    this.currentIndex++;
    this.showDialogue(this.currentIndex);
  }

  endDialogue() {
    clearInterval(this.typewriterInterval);
    this.overlay.classList.remove('vn-visible');
    setTimeout(() => {
      if (this.overlay && this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      if (typeof this.onComplete === 'function') {
        this.onComplete();
      }
    }, 400); // Wait for CSS opacity transition
  }
}

// Export for module usage, or attach to window for plain script inclusion
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DialogueManager;
} else {
  window.DialogueManager = DialogueManager;
}
