import React, {Component} from 'react';
import Camera from 'react-html5-camera-photo';

class CameraOpener extends Component {
  onCameraError(error) {
    console.error('error', JSON.stringify(error));
  }

  render() {
    return (
      <div>
        <Camera
          onCameraError={error=> this.onCameraError(error)}/>
      </div>
    )
  }
}

export default CameraOpener;