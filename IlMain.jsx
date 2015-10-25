var React = require('react')
var chokidar = require('chokidar')
var _        = require('lodash')

var IlPanel = require('./IlPanel.jsx')

var IlMain = React.createClass({
  getInitialState: function() {
    return {
      images: []
    }
  },
  componentDidMount: function() {

    this.watcher = chokidar.watch('./images/', {
      ignoreInitial: true
    })

    this.watcher.on('add', function(path) {
      setTimeout(function() {

        // clone the array to avoid mutating it
        var images = _.cloneDeep(this.state.images)
        if (_.findIndex(images, {path: path}) === -1) {
          // push the new image onto the array
          images.push({
            path: path,
            isDefault: false,
            useImage: false
          })
        }

        //apply as state
        this.setState({images: images})

      }.bind(this), 500)
    }.bind(this))

  },
  componentWillUnmount: function() {
    this.watcher.close()
  },
  handleDefaultChange: function(path, newImage) {

    var images = _.cloneDeep(this.state.images)
    var imageIndex = _.findIndex(images, {path: path})
    images[imageIndex] = newImage

    //make sure only one image gets the `isDefault` flag
    _.each(images, function(image, i) {
      if (newImage.isDefault && (i !== imageIndex)) {
        image.isDefault = false
      }
    })

    this.setState({images: images})

  },
  render: function() {
    return <IlPanel images={this.state.images} onDefaultChange={this.handleDefaultChange}/>
  }
})

module.exports = IlMain
