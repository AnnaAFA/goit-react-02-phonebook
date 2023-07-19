import React from 'react';
import { StyledModal, StyledOverlay } from './styled';
import PropTypes from 'prop-types';

class Modal extends React.Component {

    handleKeyDown = (e) => {
        if (e.code === "Escape") {
            this.props.onCloseModal();
        }
}

    handleOverlayClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onCloseModal();
        }

    }
    
  componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
    
    componentWillUnmount() { 
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
        <StyledOverlay onClick={this.handleOverlayClick}>
            <StyledModal>
                <button onClick={this.props.onCloseModal}>&times;</button>
                {JSON.stringify(this.props.visibleData, null, 2)}
            </StyledModal>
        </StyledOverlay>
    )
    }
}

Modal.propTypes = {
    visibleData: PropTypes.any.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}



export default Modal;

