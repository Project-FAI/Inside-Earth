const queue = [];

function tween(start, end, duration, callback, timeStamp) {
  queue.push({ start, end, duration, callback, timeStamp });
} 

function update(time) {
    queue.forEach((tween, index) => {
        const { start, end, duration, callback, timeStamp } = tween;
        const elapsedTime = time - timeStamp;

        
        
        let progress = elapsedTime / (duration / 1000);
        progress = easeFunction(progress);     
         
        console.log(progress);

        if (progress >= 1) {
            callback(end);
            queue.splice(index, 1);
        } else {
            const value = start + (end - start) * progress;
            

            callback(value);
        }
    });
}

function easeFunction(t) {
    return 1 - (1 - t) * (1 - t) * (1 - t);
}

export { tween, update };