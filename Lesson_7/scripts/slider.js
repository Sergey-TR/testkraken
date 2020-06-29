'use strict';

let arrowLeft = document.querySelector('.fa-arrow-circle-left');
let arrowRight = document.querySelector('.fa-arrow-circle-right');
let imgEl = document.querySelectorAll('.slider__item');
let hidden = document.querySelector('.slider__hidden');

window.addEventListener('load', function () {
    images.unit();
    arrowLeft.addEventListener('click', function () {
        images.leftNextImg();
        //arrowLeft.classList.add('animate__animated', 'animate__zoomIn');
    });
    arrowRight.addEventListener('click', function () {
        images.righttNextImg();
    });
});

let images = {
    currentIdx: 0,

    imgSlide: [],

    unit() {
        this.imgSlide = imgEl;
        this.showImgCurrentIdx();
    },

    showImgCurrentIdx() {
        this.imgSlide[this.currentIdx].classList.remove('slider-hidden');
    },

    leftNextImg() {
       

       let hideImgSlade = document.querySelector('.slider__item:not(.slider-hidden)');
        hideImgSlade.classList.add('slider-hidden', 'animate__animated', 'animate__zoomOut' );
        setTimeout(() => {
            hideImgSlade.classList.remove('animate__zoomOut');
        }, 1000);

        if (this.currentIdx == 0) {
            this.currentIdx = this.imgSlide.length - 1;
        } else {
            this.currentIdx--;
        }
        let currentImageSlade = this.imgSlide[this.currentIdx];
        currentImageSlade.classList.add('animate__animated', 'animate__zoomIn');
        currentImageSlade.classList.remove('slider-hidden');
        setTimeout(() => {
            currentImageSlade.classList.remove('animate__zoomIn');
        }, 1000);
        //this.showImgCurrentIdx();
    },

    righttNextImg() {
        //this.hideImg();
        let hideImgSlade = document.querySelector('.slider__item:not(.slider-hidden)');
        hideImgSlade.classList.add('slider-hidden','animate__animated', 'animate__zoomOut' );
        setTimeout(() => {
            hideImgSlade.classList.remove('animate__zoomOut');
        }, 1000);

        if(this.currentIdx == this.imgSlide.length - 1) {
            this.currentIdx = 0;
        } else {
            this.currentIdx++;
        }
        let currentImageSlade = this.imgSlide[this.currentIdx];
        currentImageSlade.classList.add('animate__animated', 'animate__zoomIn');
        currentImageSlade.classList.remove('slider-hidden');
        setTimeout(() => {
            currentImageSlade.classList.remove('animate__zoomIn');
        }, 1000);
        //this.showImgCurrentIdx();
    },
}