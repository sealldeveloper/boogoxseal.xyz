function drawLabelledBox(ctx,colour,posX,posY,width,height,textX,textY,text,fontsize){
    ctx.fillStyle = colour;
    ctx.fillRect(posX,posY,width,height)
    ctx.stroke()
    ctx.fillStyle = "black";
    if (text && fontsize) {
        ctx.font = fontsize+"px CozetteVector";
        ctx.fillText(text,textX,textY)
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function makeArray(int) {
    return Array.apply(null, Array(Number(int))).map(function (x, i) { return i; })
}
function waitFor(conditionFunction) {

    const poll = resolve => {
        if(conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}
function zipImg(name) {
    var canvas = document.getElementById(name)
    var datauri = canvas.toDataURL('image/png')
    var data = datauri.replace(/^data:image\/\w+;base64,/, "");
    return data
}
function overlayShow() {
    $('#overlay').removeClass('visually-hidden')
    $('body').css('overflow','hidden')
}
function overlayHide() {
    $('#overlay').addClass('visually-hidden')
    $('body').css('overflow','auto')
}