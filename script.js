document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const currentPos = window.scrollY;
    const sections = document.querySelectorAll('body>section');
    const links= document.querySelectorAll('#navigation a');

    sections.forEach((el) => {
        if (el.offsetTop <= currentPos && (el.offsetTop + el.offsetHeigth) > currentPos) {
            links.forEach((a) => {
                a.classList.remove('navigation__link-selected');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('navigation__link-selected');
                }
            }
        }
    });

}