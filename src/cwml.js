const cwml = {
    tags: {},
    registerTag: function(_tag, _descriptor = new CwmlTagDescriptor()) {
        window.customElements.define(_tag.toLowerCase(), 
            class CwmlTag extends HTMLElement {
                descriptor = new CwmlTagDescriptor();

                constructor(){
                    super(); 

                    this.descriptor = _descriptor;

                    // Add observed events
                    for(var event_name in this.descriptor.eventsObserved) {
                        var event_func = this.descriptor.eventsObserved[event_name];
                        if(!event_name.startsWith('__')) {
                            this.addEventListener(event_name, function(e) { event_func(e.target); } );
                        }
                    }
                }

                connectedCallback() { this.descriptor.eventsObserved['__added__'] !== undefined ? this.descriptor.eventsObserved['__added__'](this) : undefined; }
                disconnectedCallback() { this.descriptor.eventsObserved['__removed__'] !== undefined ? this.descriptor.eventsObserved['__removed__'](this) : undefined; }
                adoptedCallback() { this.descriptor.eventsObserved['__adopted__'] !== undefined ? this.descriptor.eventsObserved['__adopted__'](this) : undefined; }

                static get observedAttributes() {
                    return Object.keys(_descriptor.attrsObserved);
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    this.descriptor.attrsObserved[attrName] !== undefined ? this.descriptor.attrsObserved[attrName](this, oldVal, newVal) : undefined;
                }
            }
        );

        this.tags[_tag] = {
            events: Object.keys(_descriptor.eventsObserved),
            attributes: Object.keys(_descriptor.attrsObserved),
        }
    },

    isTagSupported: function(tag) {
        return this.tags[tag] !== undefined;
    },
    isAttrSupported: function(tag,attr) {
        return this.tags[tag] !== undefined ? this.tags[tag].attributes.includes(attr) : false;
    }
}

class CwmlTagDescriptor {
    eventsObserved = {};
    attrsObserved = {};
    constructor(events={}, attrs={}) {
        this.eventsObserved = events;
        this.attrsObserved = attrs;
    }
}
