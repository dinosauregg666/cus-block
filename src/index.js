import './index.scss'
import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon} from "@wordpress/components"
import React from 'react'

wp.blocks.registerBlockType('my-namespace/my-block', {
    title: 'My Custom Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        question: {type: 'string'},
        answers: {type: 'array', default: ['red', 'blue']}
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
    function updateQuestion(value) {
        props.setAttributes({question: value})
    }
    function deleteAnswer(indexToDelete) {
        const newAnswers = props.attributes.answers.filter(function(x, index) {
            return index != indexToDelete
        })
        props.setAttributes({answers: newAnswers})
    }

    return (
        <div className="myClass">
            <TextControl label="Question:" value={props.attributes.question} onChange={updateQuestion} style={{fontSize: "20px"}} />
            <p style={{fontSize: "13px", margin: "20px 0 10px 0"}}>Answers:</p>

            {
                props.attributes.answers.map(function(answer, index) {
                    return (
                        <Flex>
                            <FlexBlock>
                                <TextControl value={answer} onChange={newValue => {
                                    const newAnswers = props.attributes.answers.concat([]) // 返回一个新数组，不影响旧数组
                                    newAnswers[index] = newValue
                                    props.setAttributes({answers: newAnswers})
                                }} />
                            </FlexBlock>
                            <FlexItem>
                                <Button>
                                    <Icon className="mark-as-correct" icon="star-empty"></Icon>
                                </Button>
                            </FlexItem>
                            <FlexItem>
                                <Button isLink className="delete" onClick={() => deleteAnswer(index)}>Delete</Button>
                            </FlexItem>
                        </Flex>
                    )
                })
            }
            <Button isPrimary onClick={() => {
                props.setAttributes({answers: props.attributes.answers.concat([""])})
            }}>Add another answer</Button>
        </div>
    )
}