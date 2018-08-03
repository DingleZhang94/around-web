import React from 'react';
import {Link} from 'react-router-dom';
import { Form, Icon, Input, Button,message } from 'antd';
import $ from 'jquery';
import {API_ROOT} from '../constant';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        $.ajax({
          url: `${API_ROOT}/login`,
          method: 'POST',
          data: JSON.stringify({
            username: values.username,
            password: values.password,
          })
        }).then((response) => {
          this.props.handleLogin(response);
        },(response) => {
          message.error(response.responseText);
        }).catch((e)=>{
          console.log(e);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <h4>
          Or <Link to="/register">register now!</Link>
          </h4>
        </FormItem>
      </Form>
    );
  }
}

export const Login = Form.create()(NormalLoginForm);