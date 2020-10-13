// Функция которая, перебирает все элементы с классом "ibg", и картинку которая загружается внутри этого элмента устанавливает
// на фон этого элемента для более гибкой работы с изображениями.
function ibg(){
    let ibg=document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if(ibg[i].querySelector('img')){
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
            }
        }
    }
ibg()


// Код для бургер-меню
const burger = document.querySelector('.burger')
burger.onclick = event=>{
    burger.classList.toggle('active')
    document.querySelector('.burger__menu').classList.toggle('active')
    // Отлючает скролл по главной странице.
    document.querySelector('body'.classList.toggle('locked'))
}