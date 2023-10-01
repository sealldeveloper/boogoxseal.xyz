function drawLabelledBox(ctx,colour,posX,posY,width,height,textX,textY,text,fontsize){
    ctx.fillStyle = colour;
    ctx.fillRect(posX,posY,width,height)
    ctx.stroke()
    ctx.fillStyle = "black";
    ctx.font = fontsize+"px CozetteVector";
    ctx.fillText(text,textX,textY)
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}