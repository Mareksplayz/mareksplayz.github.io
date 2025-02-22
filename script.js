function checkCode() {
  const code = document.getElementById('access-code').value;
  if (code === '333') {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('matrix-screen').classList.remove('hidden');
    
    // Stagger the appearance of notepad windows
    const notepads = document.querySelectorAll('.notepad');
    notepads.forEach((notepad, index) => {
      notepad.style.animationDelay = `${index * 0.2}s`;
    });

    // Create matrix rain effect
    createMatrixRain();
  } else {
    alert('Access Denied');
  }
}

function createMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '01'.split('');
  const drops = [];
  const fontSize = 15;
  const columns = canvas.width / fontSize;

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);
}