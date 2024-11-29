import './index.scss'
import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker} from "@wordpress/components"
import {InspectorControls} from "@wordpress/block-editor"
import {ChromePicker} from 'react-color'

import React from 'react'

// 如果没有设置答案就锁定帖子的保存功能
!function() {
    let locked = false
     wp.data.subscribe(function() {
         const results = wp.data.select('core/block-editor').getBlocks().filter(function(block) {
             return block.name == 'my-namespace/my-block' && block.attributes.correctAnswer == undefined
         })

         if(results.length && locked == false) {
             locked = true
             wp.data.dispatch('core/editor').lockPostSaving('mylockflag')
         }

         if(!results.length && locked) {
             locked = false
             wp.data.dispatch('core/editor').unlockPostSaving('mylockflag')
         }
     })
}()

wp.blocks.registerBlockType('my-namespace/my-block', {
    title: 'My Custom Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        question: {type: 'string'},
        answers: {type: 'array', default: ['']},
        correctAnswer: {type: 'number', default: undefined},
        bgColor: {type: 'string', default: '#EBEBEB'}
    },
    edit: EditComponent,
    save: function(props) {
        return null
    },
    // deprecated: [{
    //     attributes: {
    //         skyColor: {type: 'string'},
    //         grassColor: {type: 'string'},
    //     },
    //     save: function(props) {
    //         return (
    //             <div>
    //                 color:
    //                 <span className="skyColor">{props.attributes.skyColor}</span>
    //                 ===========
    //                 <span className="grassColor">{props.attributes.grassColor}</span>
    //             </div>
    //         )
    //     },
    // }]
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

    function deleteAnswer(indexToDelete) {
        const newAnswers = props.attributes.answers.filter(function(x, index) {
            return index != indexToDelete
        })
        props.setAttributes({answers: newAnswers})
        if(indexToDelete == props.attributes.correctAnswer) {
            props.setAttributes({correctAnswer: undefined})
        }
    }

    function markAsCorrect(index) {
        props.setAttributes({correctAnswer: index})
    }

    return (
        <div className="myClass" style={{backgroundColor: props.attributes.bgColor}}>
            {/* 添加后台设置背景颜色的控制面板 */}
            <InspectorControls initialOpen={true}>
                <PanelBody title="Background Color">
                    <PanelRow>
                        <ChromePicker color={props.attributes.bgColor} onChangeComplete={x => props.setAttributes({bgColor: x.hex})} disableAlpha={true} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
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
                                <Button onClick={() => markAsCorrect(index)}>
                                    <Icon className="mark-as-correct" icon={props.attributes.correctAnswer == index ? 'star-filled' : 'star-empty'}></Icon>
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