import { Modal, Button } from 'antd';
import React from 'react';
import {WrappedCreatePostForm} from './CreatePostForm';

export default class CreatePostButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading} = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create Post</Button>
        <Modal title="New Post"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="Submit"
        >
        <WrappedCreatePostForm/>
        </Modal>
      </div>
    );
  }
}
