if (StyleAnimator.Tween) {
    StyleAnimator.Tween = {
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

                case StyleAnimator.Tween.Type.CircularIn:
                    return 1 - Math.sqrt(1 - k * k);

                case StyleAnimator.Tween.Type.CircularOut:
                    k2 = k - 1;
                    return Math.sqrt(1 - (k2 * k2));

                case StyleAnimator.Tween.Type.CircularInOut:
                    k2 = k * 2;
                    km2 = k2 - 2;
                    if (k2 < 1) {
                        return -0.5 * (Math.sqrt(1 - k2 * k2) - 1);
                    }
                    return 0.5 * (Math.sqrt(1 - (km2) * km2) + 1);

                case StyleAnimator.Tween.Type.ElasticIn:
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

                case StyleAnimator.Tween.Type.ElasticOut:
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

                case StyleAnimator.Tween.Type.ElasticInOut:
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

                case StyleAnimator.Tween.Type.BackIn:
                    s = 1.70158;
                    return k * k * ((s + 1) * k - s);

                case StyleAnimator.Tween.Type.BackOut:
                    s = 1.70158;
                    k2 = k - 1;
                    return k2 * k2 * ((s + 1) * k2 + s) + 1;

                case StyleAnimator.Tween.Type.BackInOut:
                    s = 1.70158 * 1.525;
                    k2 = k * 2;
                    km2 = k2 - 2;
                    if (k2 < 1) {
                        return 0.5 * (k2 * k2 * ((s + 1) * k2 - s));
                    }
                    return 0.5 * (km2 * km2 * ((s + 1) * km2 + s) + 2);

                case StyleAnimator.Tween.Type.BounceIn:
                    return 1 - StyleAnimator.Tween.Bounce(1 - k);

                case StyleAnimator.Tween.Type.BounceOut:
                    return StyleAnimator.Tween.Bounce(k);

                case StyleAnimator.Tween.Type.BounceInOut:
                    if (k < 0.5) {
                        return StyleAnimator.Tween.Bounce(k * 2) * 0.5;
                    }
                    return StyleAnimator.Tween.Bounce(k * 2 - 1) * 0.5 + 0.5;

                case StyleAnimator.Tween.Type.ExpIn:
                    if (k == 0) {
                        return 0;
                    } else {
                        return Math.pow(1024, k - 1);
                    }

                case StyleAnimator.Tween.Type.ExpOut:
                    if (k == 1) {
                        return 1;
                    } else {
                        return 1 - Math.pow(2, -10 * k);
                    }

                case StyleAnimator.Tween.Type.ExpInOut:
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

                case StyleAnimator.Tween.Type.CubicIn:
                    return k * k * k;

                case StyleAnimator.Tween.Type.CubicOut:
                    return --k * k * k + 1;

                case StyleAnimator.Tween.Type.CubicInOut:
                    k2 = k * 2;
                    km2 = k2 - 2;
                    if ((k2) < 1) {
                        return 0.5 * k2 * k2 * k2;
                    }
                    return 0.5 * ((km2) * km2 * km2 + 2);

                case StyleAnimator.Tween.Type.QuadraticIn:
                    return k * k;

                case StyleAnimator.Tween.Type.QuadraticOut:
                    return k * (2 - k);

                case StyleAnimator.Tween.Type.QuadraticInOut:
                    k2 = k * 2;
                    km2 = k2 - 1;
                    if (k2 < 1) {
                        return 0.5 * k2 * k2;
                    }
                    return -0.5 * (km2 * (km2 - 2) - 1);

                case StyleAnimator.Tween.Type.SinusoidalIn:
                    return 1 - Math.cos(k * Math.PI / 2);

                case StyleAnimator.Tween.Type.SinusoidalOut:
                    return Math.sin(k * Math.PI / 2);

                case StyleAnimator.Tween.Type.SinusoidalInOut:
                    return 0.5 * (1 - Math.cos(Math.PI * k));

                case StyleAnimator.Tween.Type.Linear:
                    return k;
            }
        }

    }
};