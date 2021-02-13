![CWML](https://via.placeholder.com/800x500/232424/0afc77?text=CWML)

CWML is brand-new JavaScript micro-framework to extend HTML and add support for defining custom reactive tags. Micro-framework takes only 3kb and doesn't requires any compilation.

# Installation
1. Copy code of src/cwml.min.js
2. Create file cwml.min.js in your project dist folder
3. Write `<script src="dist/cwml.min.js"></script>` in your .html page

# How to use
If you need to basically **register new tag** for your HTML page:
```html
<my-tag>Hello World Tag!</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.init();
    cwml.registerTag(
        $tag = 'my-tag'
    );
</script>
```
**NOTE: place your &lt;script&gt; tag at bottom of the &lt;body&gt;**

If you need to **add support of custom attributes to your tag**:
```html
<my-tag my-attribute="some value">Hello World Tag!</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.init();
    cwml.registerTag(
        $tag = 'my-tag',
        $attrs = {
            'my-attribute': function(el,oldVal,newVal) {
                console.log('my-attribute was changed to ' + newVal + '!');
            }
        }
    );
</script>
```

Also **you can add event-handling to your tag**.
Event will be handled for every instance of your tag, you can get handled instance by `el` argument. 
You can handle every html event and also cwml events:
- `__init__` event (When tag  was initialized/registered)
- `__added__` event (When tag element was added to document)
- `__removed__` event (When tag element was removed from document)
- `__adopted__` event (When tag element was moved/adopted by another element in document)

Example of `click` event handling:
```html
<my-tag>Hello World Tag!</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.init();
    cwml.registerTag(
        $tag = 'my-tag',
        $attrs = {},
        $events = {
            click: function(el) {
                console.log('my-tag was clicked!');
            }
        },
    );
</script>
```

If you need to **define style of the element** you can use `$props` to set css properties of the tag. Example:
```html
<my-tag>Hello World Tag!</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.init();
    cwml.registerTag(
        $tag = 'my-tag',
        $attrs = {},
        $events = {},
        $props = {
            'color': 'red',
            'background-color': 'black'
        }
    );
</script>
```

Also **you can define inner HTML of your tag** aka **template of the tag**. That template of tag is defined by specifying `$content` attribute. You can receive attributes of element with `{name-of-attribute}` and initial inner with `{inner}`. Example:
Example:
```html
<my-tag my-attribute="some value">My initial inner</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.init();
    cwml.registerTag(
        $tag = 'my-tag',
        $attrs = {}, // we dont have to specify attributes if we dont need to observe them
        $events = {},
        $props = {},
        $content = `
            <h1>{inner} (Attribute value:{my-attribute})</h1>
        `
    );
</script>
```

Content of custom tag works fine and `my-attribute` value assigned. But what if we wil change `my-attribute` dynamicly? - Content will not update. That's because our tag isn't reactive, but **you can make it reactive**! Example:
```html
<my-tag my-attribute="some value">My initial inner</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.init();
    cwml.registerTag(
        $tag = 'my-tag',
        $attrs = ['my-attribute'], // specify attributes, they will be observed
        $events = {},
        $props = {},
        $content = `
            <h1>{inner} (Attribute value:{my-attribute})</h1>
        `
    );
</script>
```

Also CWML allows you to register attributes for existing HTML tags, example:
```html
<h1 my-attribute="some value">Some header</h1>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.init();
    cwml.registerAttr(
        $query = 'h1', // what elements will support that tag (css-like query)
        $attr = 'my-attribute',
        $callback = function(el,newVal) {
            console.log('my-attribute value was changed to ' + newVal);
        },
    );
</script>
```

# Browsers Support

| Feature     | Chrome | Firefox | Safari | Opera | Edge | IE | Android WebView |
|-------------|--------|---------|--------|-------|------|----|-----------------|
| Custom tags | v66+   | v63+    | v10.1+ | v53+  | v79+ | -  | v66+            |

### Global support: 94.1%
But you can use web-components polyfill also.

# Plans
- [ ] Built-in custom tags
