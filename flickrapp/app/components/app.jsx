import React from 'react';
import View from 'reapp-ui/views/View';
import Button from 'reapp-ui/components/Button';
import Input from 'reapp-ui/components/Input';
import Superagent from 'superagent';
import Gallery from 'reapp-ui/components/Gallery';

const MY_KEY = '__YOUR_KEY_HERE__';
const base = `https://api.flickr.com/services/rest/?api_key=${MY_KEY}&format=rest&format=json&nojsoncallback=1`;

export default React.createClass({
  getInitialState() {
    return {
      photos: []
    }
  },
  // see: https://www.flickr.com/services/api/misc.urls.html
  getFlickrPhotoUrl(image) {
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
  },

  handleSearch() {
    let searchText = this.refs.search.getDOMNode().value;
    Superagent
      .get(`${base}&method=flickr.photos.search&text=${searchText}&per_page=10&page=1`, res => {
        if (res.status === 200 && res.body.photos)
          this.setState({
            photos: res.body.photos.photo.map(this.getFlickrPhotoUrl)
          });
      });
  },
  render() {
    var { photos } = this.state;

    return (
      <View title="Flickr Search" styles={{ inner: { padding: 20 } }}>

        <Input ref="search" placeholder="Enter your search" styles={{
          input: {
            margin: '0 0 10px 0',
            border: '1px solid #ddd'
          }
        }} />
        <Button onTap={this.handleSearch}>Search Images</Button>

        <div className="verticalCenter">
          {!photos.length &&
            <p>No photos!</p>
        }

        {!!photos.length &&
          <Gallery
            onClose={() => this.setState({ photos: [] })}
            images={photos}
            width={window.innerWidth}
            height={window.innerHeight - 44}
          />
        }
      </div>

    </View>
  );
}
});