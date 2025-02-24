document.getElementById('colibriImage').addEventListener('click', function() {
    this.style.transition = 'transform 0.5s ease, left 0.5s ease';
    this.style.transform = 'scale(0.65)';
    this.style.position = 'absolute';
    this.style.left = '65%';

    setTimeout(() => {
        document.getElementById('textWrapper').style.display = 'block';
        typeWriterEffect();
    }, 500);
});

function typeWriterEffect() {
    const text = "We are seeking intelligent people to our club";
    let i = 0;
    const speed = 50; // Adjust typing speed here
    const typewriterText = document.getElementById('typewriterText');

    function type() {
        if (i < text.length) {
            typewriterText.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}
