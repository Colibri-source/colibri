
document.addEventListener('DOMContentLoaded', () => {
    const bird = document.getElementById('bird');
    const textWrapper = document.getElementById('text-wrapper');
    const textContainer = document.getElementById('text-container');
    const girButton = document.getElementById('gir-button');
    let imageClicked = false; // Flag variable

    bird.addEventListener('click', () => {
        imageClicked = true; // Set flag to true when image is clicked
        bird.classList.add('moving');
        bird.style.transform = 'translateX(-75%) scale(0.4)';

        // Set text content
        const text = "We are seeking intelligent people for the club";
        textContainer.textContent = text;

        const birdRect = bird.getBoundingClientRect();
        const birdCenterY = birdRect.top + birdRect.height / 2;
        textWrapper.style.left = `${Math.round(birdRect.right + 20)}px`; // Position 20px to the right of the bird image
        textWrapper.style.top = `${Math.round(birdCenterY - textWrapper.offsetHeight / 2)}px`; // Vertically center relative to the bird image
        textContainer.textContent = "";

        bird.addEventListener('transitionend', () => {
            if (imageClicked) {
                textWrapper.style.opacity = 1;

                const birdRect = bird.getBoundingClientRect();
                const birdCenterY = birdRect.top + birdRect.height / 2;
                textWrapper.style.left = `${Math.round(birdRect.right + 20)}px`; // Position 20px to the right of the bird image
                textWrapper.style.top = `${Math.round(birdCenterY - textWrapper.offsetHeight / 2)}px`; // Vertically center relative to the bird image
                textContainer.style.opacity = 1;

                let index = 0;

                const typewriter = setInterval(() => {
                    textWrapper.style.height = textContainer.offsetHeight + 'px'; // Adjust height dynamically
                    if (index < text.length) {
                        textContainer.textContent += text[index];
                        index++;
                        textWrapper.style.width = (textContainer.scrollWidth + 5) + 'px'; // Adjust width dynamically
                    } else {
                        clearInterval(typewriter);
                        textContainer.style.cursor = 'default';
                        const textWrapperRect = textWrapper.getBoundingClientRect();
                        girButton.style.width = 'auto'; // Fit text inside the Colibri button
                        girButton.style.left = (textWrapperRect.right + (textWrapperRect.width * 0.03)) + "px";
                        girButton.style.top = `${Math.round(textWrapperRect.top)}px`;
                        girButton.style.opacity = 1;
                    }
                }, 50);

                textContainer.style.cursor = 'blink';
            }
        });
    });

    girButton.addEventListener('click', () => {
        bird.style.transition = 'transform 0.2s ease';
        bird.style.transform = 'translate(75%, 60%) scale(0.3) rotate(45deg)';
        textWrapper.remove();
        girButton.remove();

        setTimeout(() => {
            const newTextWrapper = document.createElement('div');
            newTextWrapper.id = 'new-text-wrapper';
            newTextWrapper.style.position = 'absolute';
            newTextWrapper.style.border = '2px solid green';
            newTextWrapper.style.backgroundColor = 'transparent';
            newTextWrapper.style.padding = '5px';
            newTextWrapper.style.width = '0';
            newTextWrapper.style.height = '0';
            newTextWrapper.style.opacity = '0';
            newTextWrapper.style.transformOrigin = 'top left';
            document.body.appendChild(newTextWrapper);

            newTextWrapper.style.right = '575px';
            newTextWrapper.style.bottom = '235px';

            // Add fillable blanks with shadow guides
            const placeholders = ["Name Surname", "Username", "Class", "Phone Number", "E-mail"];
            placeholders.forEach(placeholder => {
                const blank = document.createElement('input');
                blank.type = 'text';
                blank.className = 'fillable-blank';
                blank.placeholder = placeholder;
                blank.name = placeholder.toLowerCase().replace(" ", "-"); // Ensure the input names match the form fields
                newTextWrapper.appendChild(blank);
            });

            // Add send button
            const sendButton = document.createElement('button');
            sendButton.id = 'send-button';
            sendButton.textContent = 'Send';
            newTextWrapper.appendChild(sendButton);

            setTimeout(() => {
                newTextWrapper.style.opacity = '1';
                newTextWrapper.style.animation = 'dragOpen 0.8s forwards';
            }, 2000); // 2-second delay before the box animation starts

            setTimeout(() => {
                const blanks = document.querySelectorAll('.fillable-blank');
                blanks.forEach(blank => {
                    blank.style.opacity = '1';
                });
                sendButton.style.opacity = '1';
            }, 3500); // 1.5-second delay before the blanks and send button fade in

            // Connect send button to form submission
            sendButton.addEventListener('click', () => {
                const form = document.createElement('form');
                form.action = "https://formspree.io/f/xkgoaqzr";
                form.method = "POST";
                form.style.display = 'none';

                // Append the blanks to the form
                const blanks = document.querySelectorAll('.fillable-blank');
                blanks.forEach(blank => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = blank.name;
                    input.value = blank.value;
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit(); // Submit the form
            });
        }, 200); // 2-second delay before the box animation starts

       setTimeout(() => {
            bird.style.transition = 'transform 0.5s ease';
            bird.style.transform = 'translate(-115%, -50%) rotate(0deg)'; // 30% more to the left
        }, 400); // 2-second delay before the box animation starts
    });
});
