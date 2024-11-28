import './index.scss'
import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon} from "@wordpress/components"
import React from 'react'

wp.blocks.registerBlockType('my-namespace/my-block', {
    title: 'My Custom Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        skyColor: {type: 'string'},
        grassColor: {type: 'string'},
    },
    edit: EditComponent,
    save: function(props) {
        return null
    },
    deprecated: [{
        attributes: {
            skyColor: {type: 'string'},
            grassColor: {type: 'string'},
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
        },
    }]
});

function EditComponent(props) {
    function updateSkyColor(event) {
        props.setAttributes({skyColor: event.target.value})
    }

    function updateGrassColor(event) {
        props.setAttributes({grassColor: event.target.value})
    }

    return (
        <div className="myClass">
            <TextControl label="Question:" style={{fontSize: "20px"}} />
            <p style={{fontSize: "13px", margin: "20px 0 10px 0"}}>Answers:</p>
            <Flex>
                <FlexBlock>
                    <TextControl></TextControl>
                </FlexBlock>
                <FlexItem>
                    <Button>
                        <Icon className="mark-as-correct" icon="star-empty"></Icon>
                    </Button>
                </FlexItem>
                <FlexItem>
                    <Button isLink className="delete">Delete</Button>
                </FlexItem>
            </Flex>

            <Button isPrimary>Add another answer</Button>
        </div>
    )
}