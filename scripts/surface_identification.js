const water_tex = document.createElement('canvas');
const water_tex_ctx = water_tex.getContext('2d', {willReadFrequently: true});

window.onload = function() {
    console.log("loade windwos");
    
    const water_tex_img = document.querySelector('.water-texture');    
    water_tex.width = water_tex_img.width;
    water_tex.height = water_tex_img.height;
    const ctx = water_tex.getContext('2d');
    ctx.drawImage(water_tex_img, 0, 0);
}

function identify_surface(uvx, uvy) {
    const x = Math.floor(uvx * water_tex.width);
    const y = Math.floor((1- uvy) * water_tex.height);

    console.log(x, y);
    
    const pix =  water_tex_ctx.getImageData(x, y, 1, 1).data[0];

    if (pix == 255) {
        return "water";
    } else {
        return "land";
    }
}

export {identify_surface}