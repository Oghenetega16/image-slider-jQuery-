$(window).on('load', function() {
    "use strict";

    const imageCount = $('#slider ul li').length;
    const imageWidth = $('#slider ul li img').first().width();
    const totalWidth = (imageCount * imageWidth) + 'px';

    let leftPosition = 0;
    let counter = 0;

    // set the width of the slider 
    $('#slider ul').css('width', totalWidth);

    $('#next').click(function () {
        counter++;
        if(counter === imageCount) {

            // clone the slider ul
            $('#slider ul').clone().appendTo('#slider');
            // set the left position of the cloned slider ul to the imageWidth
            $('#slider ul').last().css('left', imageWidth + 'px');

            // this left position is for the first slider ul, it is set to negative totalWidth,
            // so that the slider is pushed out of the slider container
            leftPosition = `-${totalWidth}`;

            // the left position of the cloned slider ul is set to 0
            // so that it is in the position of the first slider ul
            $('#slider ul').last().animate({left: 0}, 700, 'easeInQuad');

            // the first slider ul is no longer in its former position as its
            // left position is changed and a callback function is added to remove the first
            // slider ul
            $('#slider ul').first().animate({left: leftPosition}, 700, 'easeInQuad', function() {
                $('#slider ul').first().remove();
            });

            counter = 0;
        }
        else {
            // the left position of the first slider ul is set to increase by (-400px * counter)
            // when next is clicked
            leftPosition = `-${counter * imageWidth}px`;
            // this is the animation 
            $('#slider ul').animate({left: leftPosition}, 700, 'easeInQuad');
        }
        
    });

    $('#previous').click(function () {
        counter--;
        if(counter < 0) {
            counter = imageCount - 1;

            // clone the slider ul
            $('#slider ul').clone().appendTo('#slider');
            // set the left position of the cloned slider ul to negative totalWidth
            $('#slider ul').last().css('left', `-${totalWidth}`);

            // the left position of the first slider ul is set to increase by (-400px * counter)
            leftPosition = `-${counter * imageWidth}px`;

            // the left position of the cloned slider ul is now in the postion of the first slider ul
            $('#slider ul').last().animate({left: leftPosition}, 700, 'easeInQuad');

            // the first slider ul is no longer in its former position as its
            // left position is changed and a callback function is added to remove the first
            // slider ul
            $('#slider ul').first().animate({left: imageWidth + 'px'}, 700, 'easeInQuad', function() {
                $('#slider ul').first().remove();
            });
        }
        else {
            // the left position of the first slider ul is set to increase by (-400px * counter)
            // when previous is clicked
            leftPosition = `-${counter * imageWidth}px`;
            // this is the animation
            $('#slider ul').animate({left: leftPosition}, 700, 'easeInQuad');
        }
    });
});