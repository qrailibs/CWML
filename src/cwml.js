var cwmlStyle = document.createElement('style');
cwmlStyle.id = 'cwml-style'
document.getElementsByTagName("head")[0].appendChild(cwmlStyle);

const cwml = {
    tags: {},
    registerTag: function($tag, $attrs={}, $events={}, $props={}, $content=``) {
        window.customElements.define($tag.toLowerCase(), 
            class CwmlTag extends HTMLElement { 
                attrs = {}; //tag observed attributes
                events = {}; //tag observed events
                content = ``; //tag content template
                initialInner = ``; //initial inner html of current dom element

                constructor(){
                    //init
                    super(); 
                    this.attrs = $attrs;
                    this.events = $events;
                    this.content = $content;
                    this.initialInner = this.innerHTML;
                    //events
                    for(var event_name in this.events) {
                        var event_func = this.events[event_name];
                        if(!event_name.startsWith('__')) {
                            this.addEventListener(event_name, function(e) { event_func(e.target); } );
                        }
                    }
                    //content
                    if(this.content != '') {
                        let _content = this.content.replaceAll('{inner}', this.initialInner);
                        if(this.hasAttributes()) {
                            for(var attr in this.attributes) {
                                _content = _content.replaceAll('{'+this.attributes[attr].name+'}', this.attributes[attr].textContent)
                            }
                        }
                        this.innerHTML = _content;
                    }
                    this.events['__init__'] !== undefined ? this.events['__init__'](this) : undefined;
                }

                connectedCallback() { this.events['__added__'] !== undefined ? this.events['__added__'](this) : undefined; }
                disconnectedCallback() { this.events['__removed__'] !== undefined ? this.events['__removed__'](this) : undefined; }
                adoptedCallback() { this.events['__adopted__'] !== undefined ? this.events['__adopted__'](this) : undefined; }

                static get observedAttributes() {
                    let observed = [];
                    // without/with observers
                    if($attrs.constructor == Array) { observed = $attrs; }
                    else if($attrs.constructor == Object) { observed = Object.keys($attrs); }
                    //observe cwml-dynamic attr
                    observed.push('cwml-dynamic');
                    return observed;
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    // call attrs observers
                    if(this.attrs.constructor == Object) {
                        this.attrs[attrName] !== undefined ? this.attrs[attrName](this, oldVal, newVal) : undefined;
                    }
                    // reactive content
                    if(this.hasAttribute('cwml-dynamic')) {
                        let _content = this.content.replaceAll('{inner}', this.initialInner);
                        for(var attr in this.attributes) {
                            _content = _content.replaceAll('{'+this.attributes[attr].name+'}', this.attributes[attr].value)
                        }
                        this.innerHTML = _content;
                    }
                }
            }
        );

        //props
        var css = $tag + ' {';
        for(var prop in $props) {
            css += prop+':'+$props[prop]+';';
        }
        if(!css.includes('display:')) { css += 'display: block;'; }
        css += '}\n';
        document.getElementById('cwml-style').innerText += css;
        
        this.tags[$tag] = {
            attributes: Object.keys($attrs),
            events: Object.keys($events),
            props: Object.keys($props),
            content: $content
        }
    },

    isTagSupported: function(tag) {
        return this.tags[tag] !== undefined;
    },
    isAttrSupported: function(tag,attr) {
        return this.tags[tag] !== undefined ? this.tags[tag].attributes.includes(attr) : false;
    }
}
