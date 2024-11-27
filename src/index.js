wp.blocks.registerBlockType('my-namespace/my-block', {
    title: 'My Custom Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        skyColor: {type: 'string', source: 'text', selector: '.skyColor'},
        grassColor: {type: 'string', source: 'text', selector: '.grassColor'},
    },
    edit: function(props) {
        function updateSkyColor(event) {
            props.setAttributes({skyColor: event.target.value})
        }

        function updateGrassColor(event) {
            props.setAttributes({grassColor: event.target.value})
        }

        return (
            <div>
                <input type="text" placeholder="sky color" value={props.attributes.skyColor} onChange={updateSkyColor} />
                <input type="text" placeholder="grass color" value={props.attributes.grassColor}  onChange={updateGrassColor} />
            </div>
        )
    },
    save: function(props) {
        return (
            <div>
                color:
                <span className="skyColor">{props.attributes.skyColor}</span>
                ===========
                <span className="grassColor">{props.attributes.grassColor}</span>
            </div>
        )
    }
});