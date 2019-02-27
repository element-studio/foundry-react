import * as React from 'react';

export default class PasswordInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value:null,
            isValid:true,
            isRevealed:false,
        };

        this.handle_KeyUp = this.handle_KeyUp.bind(this);

    }

    /*
     * ----------
     * Lifecycle events
     * ----------
     */
    componentWillMount() {
        if(typeof this.props.attachToValidationGroup === 'function'){
            this.props.attachToValidationGroup(this); // Attaching the component to the form
        }

        if(this.props.value){
            this.setState({
                value:(((this.props.value == 0 || this.props.value == ''))?this.props.value.toString():this.props.value) || ''
            });
        }else if(this.props.defaultValue){
            this.setState({
                value:(((this.props.defaultValue == 0 || this.props.defaultValue == ''))?this.props.defaultValue.toString():this.props.defaultValue) || ''
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.value || nextProps.defaultValue){
                this.setValue(nextProps.value || nextProps.defaultValue);
            }
        }
    }

    /*
     * ----------
     * User-driven events
     * @prefix handle_
     * ----------
     */

    handle_KeyUp(e){

        if(typeof this.props.KeyUp === 'function'){
            this.props.KeyUp({
                name:e.target.name,
                value:e.target.value,
            });
        }

        this.setState({
            value:e.target.value,
        });

    }


    setValue(valOrEvent) {

        let value = valOrEvent;

        if(typeof valOrEvent.target !== 'undefined'){
            value = valOrEvent.target.value;
        }

        this.setState({
            value: value
           // When the value changes, wait for it to propagate and
           // then validate the input
        }, function () {
            if(this.props.validateOnKeyUp){
                this.props.validate(this);
            }

            if(typeof this.props.onChange === 'function'){
                this.props.onChange(this.state.value);
            }
        }.bind(this));
    }

    /*
     * ----------
     * Render
     * ----------
     */
    render(){
        return (

			<fieldset class="field_set">
				<div className={'field_wrapper '+this.props.className}>
					<input className={'text_input' + ((this.state.value) && (this.state.value != '') ? ' _has-value' : '') + ((!this.state.isValid) ? ' _has-error' : '') }
						id={this.props.name}
						type="password"
						name={this.props.name}
						defaultValue={this.state.value}
						onChange={this.handle_KeyUp}
						onKeyUp={this.handle_KeyUp} />
						{
							(this.props.label)
							?
								<label htmlFor={this.props.name} className="text_input_label" data-label={this.props.label}>{this.props.label}</label>
							:null
						}
				</div>
			</fieldset>

        );
    }
}

PasswordInput.defaultProps = {
    id:null,
    name:null,
    label:"What's the password?",
    className:'',
    defaultValue:null,
    charLimit:null,
};
