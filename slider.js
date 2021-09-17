document.addEventListener('DOMContentLoaded', () => {
    sliderCustom(document.getElementsByClassName('sliderItem'));
})

slider = {group: '', position: 0, index: 0};

function sliderCustom(arr) {
    slider.length = arr.length;
    html();
    createObject(arr);
    addListener(arr);
}

function createObject(arr) {
    Array.prototype.forEach.call(arr, el => {
        const group = el.dataset.group;

        if (!slider.hasOwnProperty(group)) {
            slider[group] = {len: 0, position: 0, index: 0, elements: []};
        }

        slider[group].len++;
        slider[group].elements.push(el);
    });
}

function closeSlider() {
    document.getElementById('sliderWrapper').style.display = 'none';
    document.getElementById('sliderImageArea').innerHTML = '';
}

function addListener(arr) {
    const sw = document.getElementById('sliderWrapper');
    const close = document.getElementById('closeSlider');

    document.getElementsByTagName('body')[0].addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            sw.dispatchEvent(new Event('click'));
        }
    })

    sw.onclick =  () => closeSlider();

    close.onclick = () => closeSlider();

    Array.prototype.forEach.call(arr, el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const group = el.dataset.group;
            const index = slider[group].elements.indexOf(el);
            slider.group = group;
            slider.index = index;
            slider.position = index + 1;
            showImg(group);
        });
    })
}

function showImg(group) {
    const len = slider[group].elements.length - 1;

    if (slider.index < 0) {
        slider.index = len;
    }

    if (slider.index > len) {
        slider.index = 0;
    }

    const loader = document.getElementsByClassName('sliderLoader')[0];
    const src = slider[group].elements[slider.index].getAttribute('href');
    const sia = document.getElementById('sliderImageArea');

    document.getElementById('sliderWrapper').style.display = 'flex';
    loader.hidden = false;
    const img = createImg(src);
    img.onerror = () => {
        sia.innerHTML = `<div class="sliderError">Не удалось загрузить изображение ;(</div>`;
        loader.hidden = true;
        return false;
    }
    img.onload = () => {
        loader.hidden = true;
        sia.innerHTML = '';
        sia.append(img);
        setControls();
    }
}

function setControls() {
    const sia = document.getElementById('sliderImageArea');
    const slPrev = document.getElementById('sliderPrev');
    const slNext = document.getElementById('sliderNext');
    slPrev.style.height = sia.clientHeight + 'px';
    slPrev.style.marginTop = sia.clientHeight * -1 + 'px';
    slNext.style.height = sia.clientHeight + 'px';
    slNext.style.marginTop = sia.clientHeight * -1 + 'px';

    slPrev.onclick = (e) => {
        e.stopPropagation();
        sia.innerHTML = '';
        --slider.index;
        showImg(slider.group);
    };

    slNext.onclick = (e) => {
        e.stopPropagation();
        sia.innerHTML = '';
        ++slider.index;
        showImg(slider.group);
    };
}

function createImg(src) {
    const img = document.createElement('img');
    img.setAttribute('id', 'sliderCurrentImage');
    img.setAttribute('src', src);
    return img;
}

function html() {
    const str = `
    <div id="closeSlider">X</div>
    <div class="sliderArea">
    <div id="sliderImageArea"></div>
    <div id="sliderPrev"></div>
    <div id="sliderNext"></div>
    <div class="sliderLoader"></div>
    </div>`;
    const el = document.createElement('div');
    el.setAttribute('id', 'sliderWrapper');
    el.innerHTML = str;
    document.getElementsByTagName('body')[0].append(el);
}