import React from 'react';
import { Form, Input, Button, message,Icon} from 'antd';
import $ from 'jquery';
import {API_ROOT} from '../constant';
import {Link} from 'react-router-dom'

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        $.ajax({
            url: `${API_ROOT}/signup`,
            method: 'POST',
            data: JSON.stringify({
                username: values.username,
                password: values.password,
            })
        }).then((response) => {
            message.success(response);
            this.props.history.push('/login');
        }, (response)=>{
            message.error(response.responseText);
        }).catch((e)=>{
            console.log(e);
        });

      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className = "register-form" onSubmit={this.handleSubmit}>
        <FormItem
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onBlur={this.handleConfirmBlur} placeholder="Comfirm Password" />
          )}
        </FormItem>
        
       
        <FormItem >
          <Button type="primary" htmlType="submit">Register</Button>
          <h4>Or to <Link to="/login">log in!</Link></h4>
        </FormItem>
      </Form>
    );
  }
}

const Register = Form.create()(RegistrationForm);
export default Register;