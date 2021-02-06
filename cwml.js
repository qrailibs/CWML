//-----------------------
// API
//-----------------------
const cwml = {
    // Tags...
    tags = [],
    registerTag: function(tag, descriptor = new CwmlTagDescriptor()) {
        tagEl = new CwmlTag();
        tagEl.tag = tag;
        tagEl.descriptor = descriptor;

        this.tags.push(tagEl)
    },
    isTagSupported: function(tag) {
        var found = false;

        this.tags.forEach(tagEl => {
            if(tagEl.tag == tag) {
                found = true;
            }
        });

        return found;
    },

    // Logging...
    log = [],
    writeLog: function(type,message) {
        this.log.push({
            'type': type,
            'message':message
        });
    },
    writeInfo: function(text) {
        console.log('CWML Info:' + text);
        this.writeLog('info', text);
    },
    writeWarn: function(text) {
        console.warn('CWML Warning:' + text);
        this.writeLog('warning', text);
    },
    writeError: function(text) {
        console.error('CWML Error:' + text);
        this.writeLog('error', text);
    },
}

//-----------------------
// Classes
//-----------------------
class CwmlTagDescriptor {
    constructor(events={}, attrs={}) {
        this.eventsObserved = events;
        this.attrsObserved = attrs;
    }

    // Events...
    eventsObserved = {};
    whenEvent(event, func) {
        this.eventsObserved[event] = func;
    }
    whenClick(func) {
        this.whenEvent('onclick', func);
    }
    whenAdded(func) {
        this.whenEvent('_added', func);
    }
    whenRemoved(func) {
        this.whenEvent('_removed', func);
    }
    whenAdopted(func) {
        this.whenEvent('_adopted', func);
    }

    // Attributes...
    attrsObserved = {};
    registerAttr(attr, whenChanged=function(oldVal,newVal){}) {
        this.attrsObserved[attr] = whenChanged;
    }

    // Content...
    //TODO
}
class CwmlTag extends HTMLElement {
    // Core
    tag = '';
    descriptor = new CwmlTagDescriptor();

    constructor() {
        super();

        // Add observed events
        for(var event_name in this.descriptor.eventsObserved) {
            var event_func = this.descriptor.eventsObserved[event_name];

            //Default listeners
            if(!event_name.startsWith('_')) {
                this.addEventListener(event_name, event_func);
            }
        }
        
        // Add observed attributes
    }

    // Common events
    connectedCallback() {
        //If event callback defined
        if(this.descriptor.eventsObserved['_added'] !== undefined) {
            this.descriptor.eventsObserved['_added'](this);
        }
    }
    disconnectedCallback() {
        //If event callback defined
        if(this.descriptor.eventsObserved['_removed'] !== undefined) {
            this.descriptor.eventsObserved['_removed'](this);
        }
    }
    adoptedCallback() {
        //If event callback defined
        if(this.descriptor.eventsObserved['_adopted'] !== undefined) {
            this.descriptor.eventsObserved['_adopted'](this);
        }
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        
    }
}
