const boyCharacter = document.getElementById('boy-character');
const girlCharacter = document.getElementById('girl-character');
const explosion = document.getElementById('explosion');
const message = document.getElementById('message');

// Karakterlerin hedef konumu (ortada buluşacaklar)
const centerX = window.innerWidth / 2;
let boyX = window.innerWidth - 150;
let girlX = 50;

// İki karakterin birbirine yakın olup olmadığını kontrol et
function areCharactersMet() {
    const boyPosition = boyCharacter.getBoundingClientRect();
    const girlPosition = girlCharacter.getBoundingClientRect();
    
    return Math.abs(boyPosition.x - girlPosition.x) < 100; // 100px yakınlık
}

function animate() {
    // Erkek karakteri sola doğru hareket ettir
    if (boyX > centerX) {
        boyX -= 3;
        boyCharacter.style.right = (window.innerWidth - boyX) + 'px';
    }
    
    // Kız karakteri sağa doğru hareket ettir
    if (girlX < centerX - 50) {
        girlX += 3;
        girlCharacter.style.left = girlX + 'px';
    }
    
    // Karakterler buluştu mu kontrol et
    if (areCharactersMet()) {
        // Karakterleri gizle
        boyCharacter.style.display = 'none';
        girlCharacter.style.display = 'none';
        
        // Patlama efektini göster
        explosion.style.display = 'block';
        explosion.play();
        
        // Video bittiğinde mesajı göster
        explosion.onended = () => {
            explosion.style.display = 'none';
            message.style.display = 'block';
        };
    } else {
        requestAnimationFrame(animate);
    }
}

// Animasyonu başlat
window.onload = () => {
    setTimeout(animate, 1000);
}; 