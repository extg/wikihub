import React from 'react'
import Modal from 'react-modal'

// import css from './styles.scss'

// import '!!style-loader!css-loader!./ReactModal.css'

import SubscriptionForm from './SubscriptionForm'

const transitionDuration = 200; // 0.2s

const AccessModal = ({
  onRequestClose,
  ...props
}) => (
  <Modal
    {...props}
    onRequestClose={onRequestClose}
    shouldCloseOnOverlayClick
    contentLabel='menu' // aria-label=''menu''
    parentSelector={() => document.body}
    closeTimeoutMS={transitionDuration}
    style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      content: {
        position: 'static',
        // top: 20,
        // left: 20,
        // right: 20,
        // bottom: 20,
        // background: 'none',
        marginTop: '-25%',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        border: 'none',
        backgroundColor: '#f1f3f5',
        padding: '20px 20px 0 20px',
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: 400,
      },
    }}
  >
    <SubscriptionForm onSubmit={onRequestClose}/>
  </Modal>
)

export default AccessModal
