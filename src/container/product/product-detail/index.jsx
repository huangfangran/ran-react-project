import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.less'


class ProductDetail extends Component {
    static propTypes = {
        detail:PropTypes.string.isRequired
    };

    constructor(props){
        super(props);
        const {detail} = this.props;
        let editorState;
        if (detail){
            const blocksFromHtml = htmlToDraft(this.props.detail);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            editorState = EditorState.createWithContent(contentState);
        } else {
            editorState = EditorState.createEmpty()
        }

        this.state = {
            editorState
        };
    }


    //输入框内的value有变化的时候的方法
    onEditorStateChange = (editorState) => {
        // console.log(editorState);
        // console.log(this.props)
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorClassName="product-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/*<textarea
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />*/}
            </div>
        );
    }
}
export default ProductDetail