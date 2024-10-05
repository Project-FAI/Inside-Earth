class Tween {
    static tweens = [];
  
    #time;
  
    #start_vals = {};
    #end_vals = {};
    #ranges = {};
    #duration;
    #easeFunction = (t)=>t;

    #onUpdate = (val) => {};
    
    static QuadraticEaseOut = (t) => { return 1 - (1 - t) * (1 - t); } 

    constructor(start, end, duration) {
        for (const [key, val] of Object.entries(start)) {
            if (typeof val !== "number") {
                throw new Error("Tween: Tween values must be numbers");
            }
            if (!(key in end)) {
                throw new Error(`Tween: Key '${key}' present in start is missing in end`);
            }
            if (typeof end[key] !== "number") {
                throw new Error("Tween: Tween values must be numbers");
            }

            this.#start_vals[key] = val;
            this.#end_vals[key] = end[key];
            this.#ranges[key] = end[key] - val;
            this.#duration = duration;
        }
    }
  
    onUpdate(cb) {
        this.#onUpdate = cb;
        return this;
    }

    withEaseFuntion(easeFunction) {
        this.#easeFunction = easeFunction;
        return this;
    }

    start(time) {
      this.#time = time;
      Tween.tweens.push(this);
    }


    static update(time) {
        for (let i = 0; i < Tween.tweens.length; i++ ) {
            const tween = Tween.tweens[i];

            const elapsedTime = time - tween.#time;
            const progress = elapsedTime / tween.#duration;

            if (progress >= 1) {
                tween.#onUpdate(tween.#end_vals);
                Tween.tweens.splice(i, 1);
                --i;
            } else {
                const vals = {};
                for (const [key, val] of Object.entries(tween.#start_vals)) {
                    vals[key] = val + tween.#ranges[key] * tween.#easeFunction(progress);
                }

                tween.#onUpdate(vals);
            }

        }
    }
}


function easeFunction(t) {
    return 1 - (1 - t) * (1 - t);
}

export { Tween };