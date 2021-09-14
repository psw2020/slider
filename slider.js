document.addEventListener('DOMContentLoaded', (e) => {
    document.getElementsByClassName('slider').slider()
})

slider = {length:0,position:0, index:0};

Object.prototype.slider = function () {
    const arr = this;
    slider.length = arr.length;
    addListener(arr);
}

function addListener(arr) {
    Array.prototype.forEach.call(arr, el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const index = Array.prototype.indexOf.call(arr, el);
            slider.index = index;
            slider.position = index + 1;;
            const img = document.createElement('img');
            img.setAttribute('src',el.getAttribute('href'));
            document.getElementById('sliderArea').append(img);
        });
    })
}