var React = require('react')
var _     = require('lodash')

var IlImage = require('./IlImage.jsx')

var IlPanel = React.createClass({
  handleImageChange: function(path, newImage) {
    this.props.onDefaultChange && this.props.onDefaultChange(path, newImage)
  },
  render: function() {

    var images = _.map(this.props.images, function(image) {
      return (
        <IlImage
          image={image}
          onChange={_.partial(this.handleImageChange, image.path)}
          key={image.path}
        />
      )
    }, this)

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Item Pictures</h3>
        </div>
        <div className="panel-body">
          {images}
        </div>
      </div>
    )

  }
})

module.exports = IlPanel
