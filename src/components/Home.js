import React, { Component } from 'react';
import $ from 'jquery';
import { Tabs, Spin, Row, Col } from 'antd';
import { GEO_OPTION, POS_KEY, API_ROOT, TOKEN_KEY, AUTH_PREFIX } from '../constant';
import Gallery from './Gallery';
import CreatePostButton from './CreatePostButton';
import { WrappedAroundMap } from './AroundMap';

const TabPane = Tabs.TabPane;

export default class Home extends Component {
  state = {
    loadingGeoLocation: false,
    loadingPosts: false,
    error: '',
    posts: []
  }

  componentDidMount() {
    this.setState({
      loadingGeoLocation: true,
      loadingPosts: false,
      error: '',
    });
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(this.onSuccessLoadGeoLocation, this.onFailedLoadGeoLocation, GEO_OPTION);
    } else {
      this.setState({ error: 'Your browser does not support geoloaction!' });
    }
  }

  onSuccessLoadGeoLocation = (positon) => {
    console.log(positon);
    const { latitude, longitude } = positon.coords;
    localStorage.setItem(POS_KEY, JSON.stringify({
      lat: latitude,
      lon: longitude,
    }));
    this.setState({
      loadingGeoLocation: false,
      error: ''
    });
    this.loadNearbyPosts();
  }

  onFailedLoadGeoLocation = () => {
    this.setState({
      loadingGeoLocation: false,
      error: 'Fail to get user location'
    });
  }

  getPanelContent = (type) => {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    } else if (this.state.loadingGeoLocation) {
      return <Spin tip="Loading Geoloaction ..." />
    } else if (this.state.loadingPosts) {
      return <Spin tip="Loading Posts ..." />;
    } else if (this.state.posts && this.state.posts.length > 0) {
      if(type === 'image'){
        return this.getImagePost();
      }else{
        return this.getVideoPost();
      }

    } else {
      return null;
    }
  }

  getImagePost = () => {
    const images = this.state.posts
      .filter(post => post.type === 'image')
      .map(({ user, message, url }) => {
        return {
          user,
          caption: message,
          src: url,
          thumbnail: url,
          thumbnailWidth: 400,
          thumbnailHeight: 300,
        }
      });
    return <div>
      <Gallery images={images} />
    </div>;
  }

  getVideoPost = () => {
    return <Row gutter={12}>
      {this.state.posts
    .filter(post => post.type === 'video')
    .map(post => <Col key={post.url} span={6}><video className="video-block" src={post.url} controls/></Col>)}
    </Row>
  }

  loadNearbyPosts = (center, radius) => {
    const { lat, lon } = center ? center : JSON.parse(localStorage.getItem(POS_KEY));
    this.setState({ loadingPosts: true, error: '' });
    $.ajax({
      url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=${radius ? radius : 20}`,
      method: 'GET',
      headers: {
        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
      }
    }).then((posts) => {
      console.log(posts);
      this.setState({
        loadingPosts: false,
        posts
      });
    }, (err) => {
      this.setState({ loadingPosts: false, error: err.responseText });
    });
  }

  render() {
    return (
      <Tabs tabBarExtraContent={<CreatePostButton loadNearbyPosts={this.loadNearbyPosts} />} className='main-tabs'>
        <TabPane tab="Posts" key="1">{this.getPanelContent("image")}</TabPane>
        <TabPane tab="Video Posts" key="2">{this.getPanelContent("video")}</TabPane>
        <TabPane tab="Map" key="3">
          <WrappedAroundMap
            posts={this.state.posts}
            loadNearbyPosts={this.loadNearbyPosts}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `500px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </TabPane>
      </Tabs>
    )
  }
}
