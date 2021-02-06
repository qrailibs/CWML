var cwmlStyle = document.createElement('style');
cwmlStyle.id = 'cwml-style'
cwmlStyle.appendChild(document.createTextNode('')); 
document.getElementsByTagName("head")[0].appendChild(cwmlStyle);

const cwml = {
    tags: {},
    registerTag: function($tag, $attrs={}, $events={}, $props={}, $content=``) {
        window.customElements.define($tag.toLowerCase(), 
            class CwmlTag extends HTMLElement { 
                attrs = {};
                events = {};
                props = {};
                content = ``;

                constructor(){
                    super(); 

                    this.attrs = $attrs;
                    this.events = $events;
                    this.props = $props;
                    this.content = $content;

                    //events
                    for(var event_name in this.events) {
                        var event_func = this.events[event_name];
                        if(!event_name.startsWith('__')) {
                            this.addEventListener(event_name, function(e) { event_func(e.target); } );
                        }
                    }
                    //props
                    if(this.props.length > 0) {
                        var css = $tag + ' {';
                        for(var prop in this.props) {
                            css += prop+':'+this.props[prop]+';';
                        }
                        css += '}\n';
                        document.getElementById('cwml-style').innerText += css;
                    }
                    //content
                    if(this.content != '') {
                        let inner = this.innerHTML;
                        this.innerHTML = this.content
                            .replaceAll('{inner}',inner);
                        for(var attr in this.attributes) {
                            this.innerHTML.replaceAll('{'+attr.name+'}', attr.value)
                        }
                    }
                }

                connectedCallback() { this.events['__added__'] !== undefined ? this.events['__added__'](this) : undefined; }
                disconnectedCallback() { this.events['__removed__'] !== undefined ? this.events['__removed__'](this) : undefined; }
                adoptedCallback() { this.events['__adopted__'] !== undefined ? this.events['__adopted__'](this) : undefined; }

                static get observedAttributes() {
                    return Object.keys($attrs);
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    this.attrs[attrName] !== undefined ? this.attrs[attrName](this, oldVal, newVal) : undefined;
                }
            }
        );

        this.tags[$tag] = {
            attributes: Object.keys($attrs),
            events: Object.keys($events),
            props: Object.keys($props),
        }
    },

    isTagSupported: function(tag) {
        return this.tags[tag] !== undefined;
    },
    isAttrSupported: function(tag,attr) {
        return this.tags[tag] !== undefined ? this.tags[tag].attributes.includes(attr) : false;
    }
}
