import { Modal, Button, message} from 'antd';
import React from 'react';
import { WrappedCreatePostForm } from './CreatePostForm';
import $ from 'jquery';
import { API_ROOT, POS_KEY, AUTH_PREFIX, TOKEN_KEY } from '../constant'

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
        this.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
                const token = localStorage.getItem(TOKEN_KEY);
                const formData = new FormData();
                formData.set('lat', lat);
                formData.set('lon', lon);
                formData.set('message', values.message);
                formData.set('image', values.image[0].originFileObj);
                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: `${AUTH_PREFIX} ${token}`
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text'
                }).then(() => {
                    this.form.resetFields();
                    message.success('Successfully Create post!');
                    this.setState({
                        visible: false,
                        confirmLoading: false
                    })
                    this.props.loadNearbyPosts();
                },
                    () => {
                        message.success('Failed to Create post!');
                        this.setState({ visible: false, confirmLoading: false });
                    }).catch((e) => {
                        console.log(e);
                    });
            }

        });
    }


    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (formInstance) => {
        this.form = formInstance;
    }

    render() {
        const { visible, confirmLoading } = this.state;
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
                    <WrappedCreatePostForm ref={this.saveFormRef} />
                </Modal>
            </div>
        );
    }
}
