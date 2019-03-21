import * as React from "react";

export default class Tag extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            active:false,
        }
    }

    /*
     * Event lifecycle
     */

    componentDidMount(){
        this.setState({active:this.props.active});
    }

    handle_toggleActive = (e) => {
        e.preventDefault()

        if(this.props.readOnly == true){
            return false;
        }
        //update classes
        this.setState({active:!this.state.active});

        if(typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.index)
        }

    }

    render(){

        if(!this.props.label || !this.props.slug) {
            return false;
        }

        return (
            <span className={((this.props.status)? 'tag-' + this.props.status : 'tag') + ((typeof this.props.onClick === 'function') ? ' _is-clickable' :'') + ((this.state.active) ? '_is-active' : '')} onClick={this.handle_toggleActive}>
                <span className="type-label tag_label">{this.props.label}</span>
                { (typeof this.props.onClick === 'function') && <svg viewBox="0 0 32 32" width="15" height="15" className="tag_icon">
                    <use xlinkHref="#icon-circle-cross"></use>
                </svg> }

            </span>
        )
    }
}

Tag.defaultProps = {
    index: 0,
    label: 'Category',
    slug: 'category',
    status: '',
    onClick: null,
};
