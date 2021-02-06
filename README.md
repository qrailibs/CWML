![CWML](https://via.placeholder.com/800x500/232424/0afc77?text=CWML)

CWML is brand-new JavaScript Library to extend your HTML website and add support for new possibilities:

![New Tags](https://via.placeholder.com/800x250/07f77f/FFFFFF?text=New+Tags)

CWML is adds support for these HTML tags:
- `<tabs>`, `<tab>`;
- `<modal>`
- `<grid>`, `<col>`, `<row>` (Adaptive)
- `<tree>`, `<node>`
- `<dropdown>`
- `<tooltip>`
- `<progress>`
- `<sidebar>`
- `<breadcumb>`

Also CWML allows you to **create your own Tag or Component** in just *1 line of code*:
```js
cwml.registerTag('my-tag', new CwmlTagDescriptor());
```
After you registered your custom tag you can use it in your HTML:
```html
<my-tag>My custom tag!</my-tag>
```
Tags can be also defined via HTML:
```html
<template tag="my-tag">
  <!-- Define layout of the tag... -->
  
  <!-- Define style of the tag... -->
  <style scoped>
    mytag {
      height: 20px;
      color: red;
    }
  </style>
  
  <!-- Define logic of the tag... -->
  <script>
    console.log('Tag is used in dom!');
  </script>
</template>

<my-tag>This is my custom tag that was defined in html!</my-tag>
```

![New Attributes](https://via.placeholder.com/800x250/07f77f/FFFFFF?text=New+Attributes)

CWML is adds support for these tags attributes:
- `content-from` (Load inner HTML from file)
- More Coming soon...

Also you can define attributes for custom tags:
```js
var descriptor = new CwmlTagDescriptor(attrs={
  'my-attribute': function(oldVal,newVal) {
     console.log('Attribute value changed to '+newVal);
  }
});
cwml.registerTag('my-tag', descriptor);
```

![Adaptivity](https://via.placeholder.com/800x250/07f77f/FFFFFF?text=Adaptivity)

Bootstrap-like adaptive grid via attributes, Text Size adaptivity, Overflow preventing.
Coming soon...

![Theming](https://via.placeholder.com/800x250/07f77f/FFFFFF?text=Theming)

Dynamic theming of all tags, change theme dynamicly in JS.
Coming soon...

![Translation](https://via.placeholder.com/800x250/07f77f/FFFFFF?text=Translation)

Dynamic translation of all text, define translations in JSON, change translation dynamicly in JS.
Coming soon...
