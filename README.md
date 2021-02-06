![CWML](https://via.placeholder.com/800x500/232424/0afc77?text=CWML)

CWML is brand-new JavaScript Library to extend your HTML website and add support for new possibilities.
### New tags 
With CWML you can use brand-new HTML tags in your webpage. 

### Create your own tags & components 
You can easily define new HTML tags/components in JS by CWML functions or by writing
Easily define tags/components via JS functions or HTML `<template>` tag.

### New attributes 
CFML adds support for new attributes to use, with new attributes you can simplify many things, such as
forms, adaptivity, css properties.

### Create your own attributes
You can easily define new attributes for you tags in JS or in HTML.
Values of defined attributes are observed, you can create callback function to run it when attribute value is changed.

### Adaptivity 
CWML is supports adaptivity by defaultm you can use `<grid>`,`<row>`,`<col>` to create adaptive layouts.
CWML will do responsive text sizes, page overflow preventing automatically.

### Dynamic Theming 
All components of the webpage are styled by theme, you can change theme in JS dynamicly.

### Dynamic Translation 
All text of the webpage can be translated, you can define translation via JSON and apply it dynamicly in JS.


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

![Adaptivity](https://via.placeholder.com/800x250/07f77f/FFFFFF?text=WIP:+Adaptivity)

Bootstrap-like adaptive grid via attributes, Text Size adaptivity, Overflow preventing.
Coming soon...

![Theming](https://via.placeholder.com/800x250/07f77f/FFFFFF?text=WIP:+Theming)

Dynamic theming of all tags, change theme dynamicly in JS.
Coming soon...

![Translation](https://via.placeholder.com/800x250/07f77f/FFFFFF?text=WIP:+Translation)

Dynamic translation of all text, define translations in JSON, change translation dynamicly in JS.
Coming soon...

## Browsers Support

![Browsers Support](https://github.com/qrai/CWML/blob/main/docs/img/support.png?raw=true)
