# Polymer Style Animator

This is a simple Polymer webcomponent providing a
type of key frame animation support.

#### Attributes

Name | Details
---|---
frame| The current frame of the animation
animation| An array of key frames

#### Frames
The animation is made up of a series of key frames.

As the animation frame is updated, the style-animator will tween
the values of the style attributes as specified between the frames.

Any numerical property can be animated.

So, for example:-

```javascript
    [
        { "frame": 0, "width": 100, "height": 100 },
        { "frame": 10, "width": 200, "height": 200 }
    ]
```

Will result in a div which tweens its width and height between frames 0 and 10.

#### Example Usage

```html
    <test-animator id="my-element">
        Hello world
    </test-animator>

    <script>
        let myElement = document.getElementById("my-element");

        // Set Animation
        let animation = [
            { "frame": 0, "fontSize": 1 },
            { "frame": 10, "fontSize": 3 }
        ];
        myElement.setAttribute("animation", animation);

        // Change the Frame over time
        for ( let i = 0; i < 10; i++ ) {
            setTimeout(() => {
                myElement.setAttribute("frame", i);
            }, i * 100);
        }

    </script>
```
