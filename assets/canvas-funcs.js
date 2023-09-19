function drawLabelledBox(ctx,colour,posX,posY,width,height,textX,textY,text){
    ctx.fillStyle = colour;
    ctx.fillRect(posX,posY,width,height)
    ctx.stroke()
    ctx.fillStyle = "black";
    ctx.font = "15px CozetteVector";
    ctx.fillText(text,textX,textY)
}