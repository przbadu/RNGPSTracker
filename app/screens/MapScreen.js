import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Text } from 'react-native';

export class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: null,
        longitude: null,
      },
      error: null,
    };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    const { region, error } = this.state;
    console.log(region);

    return region.latitude && region.longitude ? (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={this.onRegionChange}
        showsUserLocation
        followsUserLocation
      />
    ) : null;
  }
}
