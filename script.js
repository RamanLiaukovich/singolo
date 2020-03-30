document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const currentPos = window.scrollY;
    const sections = document.querySelectorAll('body>section');
    const links= document.querySelectorAll('#navigation a');

    sections.forEach((el) => {
        
        if ((el.offsetTop - document.querySelector('header').offsetHeight) <= currentPos) {
            links.forEach((a) => {
                a.classList.remove('active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            })
        }
    });

}

let slides = document.querySelectorAll('.slide');
let currentItem = 0;
let isEnabled = true;

function changecurrentItem(n) {
    currentItem = (n + slides.length) % slides.length;
}

function hideItem(direction) {
    isEnabled = false;
    slides[currentItem].classList.add(direction);
    slides[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showItem(direction) {
    slides[currentItem].classList.add('next', direction);
    slides[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function previousItem(n) {
    hideItem('to-right')
    changecurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left')
    changecurrentItem(n + 1);
    showItem('from-right');
}

document.querySelector('.left__slide').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.right__slide').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

// Add black screens


// document.querySelectorAll('.vertical_phone').addEventListener('click', onClick);

// function onClick(event){
//     console.log(222);
//     let screens = document.querySelectorAll('#screen');
   
//     screens.querySelectorAll('.vertical').classList.remove('switch');
// }

document.querySelector('.vertical_phone').onclick = function() {
    document.querySelector('.vertical').classList.toggle('switch');     
};

document.querySelector('.horizontal_phone').onclick = function() {
    document.querySelector('.horizontal').classList.toggle('switch');     
};

// Portfolio tabs
document.querySelector('#portfolio-navigation').onclick = function() {
    if (event.target.getAttribute('class') !== 'selected') {
        for (let i = 0; i < document.querySelectorAll('#portfolio-navigation a').length; i++) {
            if (document.querySelectorAll('#portfolio-navigation a')[i].getAttribute('class') === 'selected') {
                document.querySelectorAll('#portfolio-navigation a')[i].classList.remove('selected')
            }
        }
        event.target.classList.add('selected');
        shufflePortfolio();

        function createNewPortfolio() {
            // portfolio shuffle
            let collection = [...document.querySelector("#portfolio > div > ul").children];
            let first = collection[0];
            let newArr = collection.slice(1);
            let end = newArr.concat(first);
        
            const newTable = document.createDocumentFragment();
            end.forEach((item) => newTable.append(item));
            return newTable;
        }
        
        function shufflePortfolio() {
            let newTable = createNewPortfolio();
            document.querySelector(".portfolio-4-column").innerHTML = '';
            document.querySelector(".portfolio-4-column").append(newTable);
        }
    }
};

document.querySelector('.portfolio-4-column').onclick = function() {
    if (event.target.getAttribute('class') !== 'portfolio_active') {
        for (let i = 0; i < document.querySelectorAll('.portfolio-4-column img').length; i++) {
            if (document.querySelectorAll('.portfolio-4-column img')[i].getAttribute('class') === 'portfolio_active') {
                document.querySelectorAll('.portfolio-4-column img')[i].classList.remove('portfolio_active')
            }
        }
        event.target.classList.add('portfolio_active');
    }
};

const modal = document.getElementById('modal');
const open = document.getElementById('button');
const close = document.getElementsByClassName('modal-button')[0];
const modalBody = document.getElementById('modal-body');
let newEl = document.createElement('p');
let newEl1 = document.createElement('p');

open.onclick = function() {
    // function preventDef(event) {
    event.preventDefault();
    if (document.querySelector("#email").validationMessage === '' && document.querySelector("#name").validationMessage === '') {
        // preventDef
    modal.style.display = "block";    
    //inputs to modal window
    let subject = document.getElementById('subject').value;
    let describe = document.getElementById('describe').value;
    
    if (subject.length === 0) {
        newEl.innerText = 'No subject';
    } else {
        newEl.innerText = 'Subject: ' + subject;
    }
    modalBody.append(newEl);

    if (describe.length === 0) {
        newEl1.innerText = 'No description';
    } else {
        newEl1.innerText = 'Description: ' + describe;
    }
    modalBody.append(newEl1);
    
    return;
    }    
    else if (document.querySelector("#name").validationMessage !== '') {
        let NameErr = document.createElement('p');
        NameErr.innerText = document.querySelector("#name").validationMessage;
        document.querySelector("#name").value = document.querySelector("#name").validationMessage;
    } else if (document.querySelector("#email").validationMessage !== '') {
        let NameErr = document.createElement('p');
        NameErr.innerText = document.querySelector("#email").validationMessage;
        document.querySelector("#email").value = document.querySelector("#email").validationMessage;
    }

}

close.onclick = function() {
    modal.style.display = "none";
    document.getElementById('form-area').reset();
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
