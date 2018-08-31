import React, { Component } from 'react'
import { Form, Input,  Upload, Icon} from 'antd';

const FormItem = Form.Item;
class CreatePostForm extends Component {

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    beforeUpload = () =>{
        return false;
    }


    render() {
        const {getFieldDecorator} =  this.props.form;
        const formItemLayout = {
            labelCol : {span : 5},
            wrapperCol: {span: 16}
        }
        return (
            <Form>
                <FormItem
                    label="Message"
                    {...formItemLayout}
                >
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input your message!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Image"
                >
                    <div className="dropbox">
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [{ required: true,
                                 message: 'Please upload your file!' }],
                        })(
                            <Upload.Dragger name="files" beforeUpload={this.beforeUpload} multiple={true}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        )}
                    </div>
                </FormItem>

            </Form>
        )
    }
}

export const WrappedCreatePostForm = Form.create()(CreatePostForm);