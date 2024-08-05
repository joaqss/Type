import React from 'react'
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';
import './editor.css';

class Editor_Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
    
    }

    // Save Data on Editor
    saveData = () => {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const jsonTitle = JSON.stringify(title);
        const jsonDescription = JSON.stringify(description);
        localStorage.setItem('title', jsonTitle);
        localStorage.setItem('description', jsonDescription);
        const content = this.state.editorState.getCurrentContent(); // get current data
        const rawData = convertToRaw(content); // convert to raw data
        const jsonData = JSON.stringify(rawData); // make 
        localStorage.setItem('content', jsonData);
        console.log("Data saved", jsonData);

    }

    // load data from local storage
    loadData = () => {
        const savedTitle = localStorage.getItem('title');
        const savedDescription = localStorage.getItem('description');
        const savedData = localStorage.getItem('content');

        if (savedData && savedTitle && savedDescription) {
            const title = JSON.parse(savedTitle);
            const description = JSON.parse(savedDescription);
            document.getElementById('title').value = title;
            document.getElementById('description').value = description;

            const rawData = JSON.parse(savedData);
            const content = convertFromRaw(rawData); //function to convert from raw to content
            const editorState = EditorState.createWithContent(content);
            this.setState({ editorState });
            console.log('Editor content loaded:', savedData);
        }
    };

    // auto save
    componentDidMount() {
        this.loadData();
        this.autoSaveInterval = setInterval(this.saveData, 1000); // Save every 5 seconds
    }

    componentWillUnmount() {
        clearInterval(this.autoSaveInterval);
    }

    // Default Key Commands
    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return true;
        }

        return false;
    }


    // Key Commands
    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );

            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }

            return;
        }

        // save command
        if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
            this.saveData();
        }

        // load data
        if ((e.ctrlKey || e.metaKey) && e.optionKey) {
            this.loadData();
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
            switch (e.keyCode) {
                case 49: 
                    this._toggleBlockType('header-one');
                    return;
                case 50:
                    this._toggleBlockType('header-two');
                    return;
                case 51:
                    this._toggleBlockType('header-three');
                    return;
                case 52:
                    this._toggleBlockType('header-three');
                    return;
                case 88:
                    this._toggleStrikethrough('STRIKETHROUGH');
                    return;
                default:
                    break;
            }
        }

        return getDefaultKeyBinding(e);
    }

    // Block Style
    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    // Inline Style
    _toggleBold() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    _toggleItalic() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }

    _toggleUnderline() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }

    _toggleStrikethrough() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
    }

    // Editor Renderer
    render() {
        const {editorState} = this.state;

        let className = ' type-editor';
        var contentState = editorState.getCurrentContent();
        var currentStyle = editorState.getCurrentInlineStyle();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' hidePlaceholder';
            }
        }

        let editor_header = document.getElementsByClassName('editor-header')[0];

        window.onscroll = () => {
            let scrollTop = window.scrollY;
            let viewportHeight = window.innerHeight;
            let contentHeight = editor_header.getBoundingClientRect().top;

            if (scrollTop <= 0) {
                editor_header.style.position = 'sticky';
                editor_header.style.top = '0';
                editor_header.style.width = '100%';
                editor_header.style.zIndex = '1000';
            } else {
                editor_header.style.position = 'static';
            }
        }

        return (
                    
            <div className="root">

                <div className="side-panel">    
                    <div className="sp-header"> 
                        <b> Folders </b> 
                        <div className="button-container"> <button className="add-folder"> +</button> </div>
                    </div>
                                    
                </div>

                <div className="editor-panel">
                    {/* Title and Description */}
                    <div className="title"> 
                        <input type="text" 
                        id="title" 
                        className="form-control form-control-lg" 
                        placeholder="Add a title" 
                        aria-label="Title" 
                        aria-describedby="basic-addon1" 
                        />

                        <input type="text" 
                        id="description" 
                        className="form-control form-control-sm" 
                        placeholder="Add a short description" 
                        aria-label="Title" 
                        aria-describedby="basic-addon1" 
                        />
                    
                    </div>


                    <div className="box">
                        {/* Editor Header */}
                        <div className="editor-header">

                            <BlockStyleControls
                                    className="block-controls"
                                    editorState={editorState}
                                    onToggle={this.toggleBlockType}
                            />
                            
                            {/* Inline Buttons */}
                            <div className=" inline-controls">
                                <button 
                                    className={`inlineButton ${currentStyle.has('BOLD') ? 'active' : ''}`}
                                    onClick={this._toggleBold.bind(this)}>
                                        Bold
                                </button>

                                <button 
                                    className={`inlineButton ${currentStyle.has('ITALIC') ? 'active' : ''}`}
                                    onClick={this._toggleItalic.bind(this)}>
                                        Italic
                                </button>

                                <button 
                                    className={`inlineButton ${currentStyle.has('UNDERLINE') ? 'active' : ''}`}
                                    onClick={this._toggleUnderline.bind(this)}>
                                        Underline
                                </button>

                                <button 
                                    className={`inlineButton ${currentStyle.has('STRIKETHROUGH') ? 'active' : ''}`}
                                    onClick={this._toggleStrikethrough.bind(this)}>
                                        Strikethrough
                                </button>

                            </div>

                    
                        </div>
                        
                        {/* Editable portion of page */}
                        <div className={className} onClick={this.focus}>
                            <Editor
                                blockStyleFn={getBlockStyle}
                                customStyleMap={styleMap}
                                editorState={editorState}
                                handleKeyCommand={this.handleKeyCommand}
                                keyBindingFn={this.mapKeyToEditorCommand}
                                onChange={this.onChange}
                                placeholder="Add a description"
                                ref="editor"
                                spellCheck={true}
                            />
                        </div>
                    </div>  
                </div>
            </div>
        );
    }
    // End of Editor Renderer 
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

// Custtom block styles
function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'blockquote';
        case 'header-one': return 'header-one';
        case 'header-two': return 'header-two'; 
        case 'header-three': return 'header-three';
        case 'code-block': return 'code-block';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = ' blockButtons';

        if (this.props.active) {
            className += ' activeButton';
        }

        return (
            <button className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </button>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one', className: 'header-one'},
    {label: 'H2', style: 'header-two', className: 'header-two'},
    {label: 'H3', style: 'header-three', className: 'header-three'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'BQ', style: 'blockquote'},
    {label: 'CB', style: 'code-block'},
];

const BlockStyleControls = (property) => {
    const {editorState} = property;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className=" controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={property.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default Editor_Page;

