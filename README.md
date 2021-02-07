![CWML](https://via.placeholder.com/800x500/232424/0afc77?text=CWML)

CWML is brand-new JavaScript Library to extend your HTML website and add support for new possibilities.

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
    cwml.registerTag(
        $tag = 'my-tag'
    );
</script>
```

If you need to **add support of custom attributes and observe them**:
```html
<my-tag my-attribute="some value">Hello World Tag!</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.registerTag(
        $tag = 'my-tag',
        $attrs = {
            'my-attribute': function(el,oldVal,newVal) {
                console.log('my-attribute was changed to '+newVal+'!');
            }
        }
    );
</script>
```

Also **you can add event-handling to your tag**.
Event will be handled for every instance of your tag, you can get handled instance by `el` argument. 
You can handle every html event and also cwml events:
- `__init__` event (When tag element was initialized)
- `__added__` event (When tag element was added to document)
- `__removed__` event (When tag element was removed from document)
- `__adopted__` event (When tag element was moved/adopted by another element in document)

Example of `click` event handling:
```html
<my-tag>Hello World Tag!</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
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
    cwml.registerTag(
        $tag = 'my-tag',
        $attrs = {}, // we dont have to specify attributes if we dont track them
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
<my-tag my-attribute="some value" cwml-dynamic>My initial inner</my-tag>

<script src="dist/cwml.min.js"></script>
<script>
    cwml.registerTag(
        $tag = 'my-tag',
        $attrs = ['my-attribute'], // Specify what attributes should be observed for dynamic updates
        $events = {},
        $props = {},
        $content = `
            <h1>{inner} (Attribute value:{my-attribute})</h1>
        `
    );
</script>
```

# Browsers Support

| Feature     | Chrome | Firefox | Safari | Opera | Edge | IE | Android WebView |
|-------------|--------|---------|--------|-------|------|----|-----------------|
| Custom tags | v66+   | v63+    | v10.1+ | v53+  | v79+ | -  | v66+            |

You can use web-components polyfill also.

# Plans
- [ ] Registration and observing of default tag attributes
- [ ] Built-in custom tags
