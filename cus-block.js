wp.blocks.registerBlockType('my-namespace/my-block', {
    title: 'My Custom Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        }
    },
    edit: function(props) {
        return wp.element.createElement(
            'p',
            null,
            'Hello, World1 edit !'
        );
    },
    save: function(props) {
        return wp.element.createElement(
            'p',
            null,
            'Hello, World2 save !'
        );
    }
});