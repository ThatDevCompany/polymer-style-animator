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

    static Tween = {};

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
        const p = !n ? 1 : TDC.Tween.Calculate(TDC.Tween.Type[c.tween || 'Linear'], (s - c.frame) / (n.frame - c.frame));

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