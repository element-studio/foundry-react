import * as React from "react";

import Tag from "./Tag";

export default class TagList extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            tags:[],
            isAdding:false,
            tagAddingValue:'',
        }
    }

    componentDidMount(){
        if(this.props.tags && this.props.tags.length){
            this.setState({
                tags:this.props.tags.slice(0)
            })
        }
    }

    componentWillUnmount(){
        this.killEventListener();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.controllable){
            if(nextProps.tags && nextProps.tags.length){
                this.setState({
                    tags:nextProps.tags
                })
            }
        }
    }

    /*
     * Event lifecycle
     */

    killEventListener = () => {
        document.removeEventListener('keydown', this.handle_escClick)
    }

    handle_escClick = (e) => {

        if(e.keyCode == 27){ // esc

            this.setState({
                tagAddingValue:'',
                isAdding:false
            },()=>{
                this.killEventListener();
                if (typeof this.props.onCancel === 'function'){
                    this.props.onCancel();
                }
            })

        }
    }

    handle_tagClick = (index) => {
        let tags = this.state.tags

        tags.splice(index,1,);

        this.setState({
            tags
        },()=>{

            if(typeof this.props.onTagsChange === 'function'){
                this.props.onTagsChange({ value:this.state.tags })
            }
        })

    }

    handle_newTagClick = () => {
        this.setState({
            isAdding:true
        },()=>{
            document.addEventListener('keydown', this.handle_escClick)
            this.refs.tagInput.focus()
        })
    }

    handle_tagValueChange = (e) => {

        if(typeof this.props.onTextChange === 'function'){
            this.props.onTextChange(e.target.value);
        }
        this.setState({
            tagAddingValue:e.target.value
        })
    }

    handle_keyDown = (e) => {

        if(e.keyCode == 13){ //enter
            e.preventDefault();

            const value = this.state.tagAddingValue.trim();

            this.addTag(value);
        }
    }

    addTag = (tagName) => {

        let tags = this.state.tags;

        if(tagName){
            tags.push(tagName);
        }

        this.setState({
            tags,
            tagAddingValue:'',
            isAdding:false
        },()=>{
            this.killEventListener();

            if(typeof this.props.onTagsChange === 'function'){
                this.props.onTagsChange({ value:this.state.tags })
            }
        })
    }


    getTags = () => {
        return this.state.tags;
    }

    render(){
        return (
            <div>
                { this.state.tags.map((tag, i) => {
                    return <Tag
                                key={ i }
                                index={ i }
                                label={ tag }
                                slug={ tag }
                                onClick={ this.handle_tagClick }
                            />
                })}
                <div className='tag-adding-wrapper'>
                    {
                        (this.state.isAdding) ?
                            <input
                                ref="tagInput"
                                type="text"
                                value={ this.state.tagAddingValue }
                                onChange= { this.handle_tagValueChange }
                                placeholder='Enter Tag Name'
                                onKeyDown={ this.handle_keyDown }
                                className="tag_add_input"
                                title="Press enter to add tag"
                            />
                        :
                            <Tag
                                label="Add Tag +"
                                slug="Add Tag +"
                                status="new"
                                onClick={ this.handle_newTagClick }
                            />
                    }
                    { this.props.injectedAutoComplete }
                </div>
            </div>
        )
    }
}

Tag.defaultProps = {
    tags: [],
    separator: '!--__--!',
    controllable: false,
    onTagsChange: null,
    onTextChange: null,
    onCancel: null,
    injectedAutoComplete: null //html.

};
