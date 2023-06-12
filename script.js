const word_el = document.getElementById('word');
const correctLetters = [];
const wrongLetters = [];
const popup_el = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
let selectedWord = getRandomWord();
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const again = document.getElementById('play-again');
const popup = document.querySelector('.popup');

function getRandomWord(){
    const words = ["css","ornek","deneme"];

    return words[Math.floor(Math.random()*words.length)];
}

function updatewrongLetters(){
    wrongLetters_el.innerHTML = `
    ${wrongLetters.length > 0 ? '<h3>Hatalı Harfler</h3>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>` )}
    `;

    items.forEach((item,index) =>{
        const count = wrongLetters.length;
        if(index < count){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    });

    if(wrongLetters.length == items.length){
        popup_el.style.display = 'flex';
        message_el.innerText = 'Kaybettiniz';
        popup.style.backgroundColor = 'red';
    }
    
}
function displayWord(){
    word_el.innerHTML =`
    ${selectedWord.split('').map(letter =>`
    <div class = "letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </div>
            `
        ).join('')}

    `;
    
    const w = word_el.innerText.replace(/\n/g,''); // Tahmin edilen kelimenin doğru kelimeyle karşılaştırılması için \n kısmını kaldırıyoruz.
    if(w == selectedWord ){
        popup_el.style.display = 'flex';
        message_el.innerText = 'Tebrikler Kazandınız';
        popup.style.backgroundColor = 'green';
        
    }  
}; 

function displayMessage(){
    message.classList.add("show");
    setTimeout(function(){
        message.classList.remove("show");
    },1000);
}

window.addEventListener('keydown',function(e){
    if(e.keyCode >=65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updatewrongLetters();
                
            }else{
                displayMessage();
            }
        }
    }
});

displayWord();

again.addEventListener('click',function(){
    wrongLetters.splice(0);
    correctLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updatewrongLetters();
    popup_el.style.display='none';
});