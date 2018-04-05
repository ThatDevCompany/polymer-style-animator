const StyleAnimatorTween = {
    Type: {
        Linear: 0,
        SinusoidalIn: 1,
        SinusoidalOut: 2,
        SinusoidalInOut: 3,
        QuadraticIn: 4,
        QuadraticOut: 5,
        QuadraticInOut: 6,
        CubicIn: 7,
        CubicOut: 8,
        CubicInOut: 9,
        ExpIn: 10,
        ExpOut: 11,
        ExpInOut: 12,
        CircularIn: 13,
        CircularOut: 14,
        CircularInOut: 15,
        ElasticIn: 16,
        ElasticOut: 17,
        ElasticInOut: 18,
        BackIn: 19,
        BackOut: 20,
        BackInOut: 21,
        BounceIn: 22,
        BounceOut: 23,
        BounceInOut: 24
    },

    Bounce: (k) => {
        let k2;
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
            k2 = k - (1.5 / 2.75);
            return 7.5625 * k2 * k2 + 0.75;
        } else if (k < (2.5 / 2.75)) {
            k2 = k - (2.25 / 2.75);
            return 7.5625 * k2 * k2 + 0.9375;
        } else {
            k2 = k - (2.625 / 2.75);
            return 7.5625 * k2 * k2 + 0.984375;
        }
    },

    Calculate: (type, k) => {
        let k2, km2, s, a, p;
        switch (type) {

            case StyleAnimatorTween.Type.CircularIn:
                return 1 - Math.sqrt(1 - k * k);

            case StyleAnimatorTween.Type.CircularOut:
                k2 = k - 1;
                return Math.sqrt(1 - (k2 * k2));

            case StyleAnimatorTween.Type.CircularInOut:
                k2 = k * 2;
                km2 = k2 - 2;
                if (k2 < 1) {
                    return -0.5 * (Math.sqrt(1 - k2 * k2) - 1);
                }
                return 0.5 * (Math.sqrt(1 - (km2) * km2) + 1);

            case StyleAnimatorTween.Type.ElasticIn:
                a = 0.1;
                p = 0.4;
                k2 = k - 1;

                if (k == 0) {
                    return 0;
                }

                if (k == 1) {
                    return 1;
                }

                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }

                return -(a * Math.pow(2, 10 * k2) * Math.sin((k2 - s) * (2 * Math.PI) / p));

            case StyleAnimatorTween.Type.ElasticOut:
                a = 0.1;
                p = 0.4;

                if (k == 0) {
                    return 0;
                }

                if (k == 1) {
                    return 1;
                }

                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }

                return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);

            case StyleAnimatorTween.Type.ElasticInOut:
                a = 0.1;
                p = 0.4;
                k2 = k * 2;
                km2 = k2 - 1;

                if (k == 0) {
                    return 0;
                }

                if (k == 1) {
                    return 1;
                }

                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }

                if (k2 < 1) {
                    return -0.5 * (a * Math.pow(2, 10 * km2) * Math.sin((km2 - s) * (2 * Math.PI) / p));
                }

                return a * Math.pow(2, -10 * km2) * Math.sin((km2 - s) * (2 * Math.PI) / p) * 0.5 + 1;

            case StyleAnimatorTween.Type.BackIn:
                s = 1.70158;
                return k * k * ((s + 1) * k - s);

            case StyleAnimatorTween.Type.BackOut:
                s = 1.70158;
                k2 = k - 1;
                return k2 * k2 * ((s + 1) * k2 + s) + 1;

            case StyleAnimatorTween.Type.BackInOut:
                s = 1.70158 * 1.525;
                k2 = k * 2;
                km2 = k2 - 2;
                if (k2 < 1) {
                    return 0.5 * (k2 * k2 * ((s + 1) * k2 - s));
                }
                return 0.5 * (km2 * km2 * ((s + 1) * km2 + s) + 2);

            case StyleAnimatorTween.Type.BounceIn:
                return 1 - StyleAnimatorTween.Bounce(1 - k);

            case StyleAnimatorTween.Type.BounceOut:
                return StyleAnimatorTween.Bounce(k);

            case StyleAnimatorTween.Type.BounceInOut:
                if (k < 0.5) {
                    return StyleAnimatorTween.Bounce(k * 2) * 0.5;
                }
                return StyleAnimatorTween.Bounce(k * 2 - 1) * 0.5 + 0.5;

            case StyleAnimatorTween.Type.ExpIn:
                if (k == 0) {
                    return 0;
                } else {
                    return Math.pow(1024, k - 1);
                }

            case StyleAnimatorTween.Type.ExpOut:
                if (k == 1) {
                    return 1;
                } else {
                    return 1 - Math.pow(2, -10 * k);
                }

            case StyleAnimatorTween.Type.ExpInOut:
                k2 = k * 2;
                if (k == 0) {
                    return 0;
                }

                if (k == 1) {
                    return 1;
                }

                if (k2 < 1) {
                    return 0.5 * Math.pow(1024, k2 - 1);
                }

                return 0.5 * (-Math.pow(2, -10 * (k2 - 1)) + 2);

            case StyleAnimatorTween.Type.CubicIn:
                return k * k * k;

            case StyleAnimatorTween.Type.CubicOut:
                return --k * k * k + 1;

            case StyleAnimatorTween.Type.CubicInOut:
                k2 = k * 2;
                km2 = k2 - 2;
                if ((k2) < 1) {
                    return 0.5 * k2 * k2 * k2;
                }
                return 0.5 * ((km2) * km2 * km2 + 2);

            case StyleAnimatorTween.Type.QuadraticIn:
                return k * k;

            case StyleAnimatorTween.Type.QuadraticOut:
                return k * (2 - k);

            case StyleAnimatorTween.Type.QuadraticInOut:
                k2 = k * 2;
                km2 = k2 - 1;
                if (k2 < 1) {
                    return 0.5 * k2 * k2;
                }
                return -0.5 * (km2 * (km2 - 2) - 1);

            case StyleAnimatorTween.Type.SinusoidalIn:
                return 1 - Math.cos(k * Math.PI / 2);

            case StyleAnimatorTween.Type.SinusoidalOut:
                return Math.sin(k * Math.PI / 2);

            case StyleAnimatorTween.Type.SinusoidalInOut:
                return 0.5 * (1 - Math.cos(Math.PI * k));

            case StyleAnimatorTween.Type.Linear:
                return k;
        }
    }
};

class StyleAnimator extends Polymer.Element {

    static get is() {
        return "style-animator";
    }

    static get properties() {
        return {
            animation: {
                type: Array,
                observer: 'animate'
            },
            frame: {
                type: Number,
                observer: 'animate'
            },
            fixed: Boolean,
            relative: Boolean
        }
    }

    constructor() {
        super();
        this.atEnd = false;
    }

    ready() {
        super.ready();
        if (this.fixed) {
            this.style.position = 'fixed';
            this.style.left = '0px';
            this.style.right = '0px';
        }
        this.animate();
    }

    animate() {
        let c = null,
            n = null,
            k = this.animation || [],
            s = this.frame || 0;

        // Relative positioning
        if (this.relative) {
            let o = this.getBoundingClientRect().top +
                (window.pageYOffset || document.documentElement.scrollTop) -
                (window.innerHeight || document.documentElement.clientHeight);
            s = s - o < 0 ? 0 : s - o;
        }

        // Find the current and next animation of the animation
        k.some(f => {
            if (s >= f.frame) {
                c = f;
            }
            if (s < f.frame) {
                n = f;
                return true;
            }
        });

        if (!c) {
            return;
        }

        // If we've already gone past the last keyframe, stop
        const atEnd = !n;
        if (atEnd && this.atEnd) {
            return;
        }
        this.atEnd = atEnd;

        // Calculate the percentage (p) through the frames
        let p = 1;
        if (typeof StyleAnimatorTween !== 'undefined' && n) {
            p = StyleAnimatorTween.Calculate(StyleAnimatorTween.Type[c.tween || 'Linear'], (s - c.frame) / (n.frame - c.frame));
        }

        // Calculate values
        for (let prop in c) {
            let v = !n ? c[prop] : c[prop] + (p * (n[prop] - c[prop]));
            switch (prop) {
                case "opacity":
                    this.style[prop] = v;
                    break;
                case "rotate":
                    this.style.transform = 'rotate(' + v + 'deg)';
                    break;
                case "fontSize":
                    this.style.fontSize = v + 'em';
                    break;
                default:
                    if (this.style.hasOwnProperty(prop)) {
                        this.style[prop] = v + 'px';
                    }
            }
        }

        this.currentFrame = c;
        this.nextFrame = n;
    }
}

window.customElements.define(StyleAnimator.is, StyleAnimator);