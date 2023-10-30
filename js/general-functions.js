function _(query){
	return document.querySelector(query);
}

function _all(query){
	return document.querySelectorAll(query);
}

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
function overlay(o) {
    bodycss = (o === 'hide') ? 'auto' : 'hidden'
    classoption = (o === 'hide') ? 'a' : 'r'
    modifyClass(classoption, 'visually-hidden', $('#overlay'))
    $('body').css('overflow', bodycss)
}

function modifyClass(etype, c, e) {
    (etype === 'a') ? e.addClass(c) : e.removeClass(c)
}

function modifyMultipleClass(etype, c, e) {
    for (f in e) modifyClass(etype, c, f)
}

function aspectRatioConvert(base,img) {
    var rw = img[0] / base[0],
        rh = img[1] / base[1],
        ar = rw > rh ? rw : rh;
    var x = (base[0]/2)-((img[0]/ar)/2),
        y = (base[1]/2)-((img[1]/ar)/2)
    return [x,y,(img[0]/ar),(img[1]/ar)]
}

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

function LoadJSONFromDisk(input, callback) {
    try{
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsText(input.files[0]);
            reader.onload = () => {
                callback(reader.result);
            };
        }  else {
            callback(undefined)
        }
    } catch (e) {
        console.log(e)
    }
}
