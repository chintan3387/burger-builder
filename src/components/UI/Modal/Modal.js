import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.show);
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render () {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}  />
                    <div className={classes.Modal}
                        style={{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-500px)',
                            opacity: this.props.show ? '1' : '0'
                    }}>
                        {this.props.children}
                    </div>
            </React.Fragment>
        )
    }
}

export default Modal;