import React, { Component } from 'react';
import $ from 'jquery';
import { Tabs, Spin } from 'antd';
import { GEO_OPTION, POS_KEY, API_ROOT, TOKEN_KEY, AUTH_PREFIX } from '../constant';
import Gallery from './Gallery';
import CreatePostButton from './CreatePostButton';
import { WrappedAroundMap } from './AroundMap';

const TabPane = Tabs.TabPane;

export default class Home extends Component {
  state = {
    loadingGeoLocation: false,
    loadingPosts: false,
    error:'',
    posts:[]
  }

  componentDidMount(){
    this.setState({
      loadingGeoLocation: true, 
      loadingPosts:false,
      error: '',
    });
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(this.onSuccessLoadGeoLocation, this.onFailedLoadGeoLocation,GEO_OPTION);
    }else{
      this.setState({error:'Your browser does not support geoloaction!'});
    }
  }

  onSuccessLoadGeoLocation=(positon)=>{
    console.log(positon);
    const {latitude, longitude} = positon.coords;
    localStorage.setItem(POS_KEY,JSON.stringify({
      lat: latitude,
      lon: longitude,
    }));
    this.setState({
      loadingGeoLocation: false,
      error: ''
    });
    this.loadNearbyPosts();
  }

  onFailedLoadGeoLocation = ()=>{
    this.setState({
      loadingGeoLocation:false,
      error: 'Fail to get user location'});
  }

  getGallaryPanelContent = () => {
    if(this.state.error){
      return <div>{this.state.error}</div>;
    }else if(this.state.loadingGeoLocation){
      return <Spin tip = "Loading Geoloaction ..."/>
    }else if(this.state.loadingPosts){
      return <Spin tip = "Loading Posts ..."/>;
    }else if(this.state.posts && this.state.posts.length > 0){
      const images = this.state.posts.map(({user,message,url})=>{
        return {
          user,
          caption: message,
          src: url,
          thumbnail:url,
          thumbnailWidth: 400,
          thumbnailHeight: 300,
      }});
      return <div>
          <Gallery images={images}/>
        </div>
    }else{
      return null;
    }
  }

  loadNearbyPosts = (center, radius) => {
    const {lat, lon} = center ? center: JSON.parse(localStorage.getItem(POS_KEY));
    this.setState({ loadingPosts: true, error: ''});
    $.ajax({
      url : `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=${radius? radius:20}`,
      method :  'GET',
      headers :{
        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
      }
    }).then((posts)=>{
      console.log(posts);
      this.setState({
        loadingPosts:false, 
        posts
      });
    }, (err)=>{
      this.setState({ loadingPosts: false, error: err.responseText });
    });
  }

  render() {
    return ( 
        <Tabs tabBarExtraContent={<CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>} className='main-tabs'>
          <TabPane tab="Posts" key="1">{this.getGallaryPanelContent()}</TabPane>
          <TabPane tab="Video Posts" key="2">Content of tab 2</TabPane>
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
