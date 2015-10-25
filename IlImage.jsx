var React = require('react')
var _     = require('lodash')
var path  = require('path')

var IlImage = React.createClass({
  imgStyle: {
    maxWidth: '150px',
    maxHeight: '150px'
  },
  handleChange: function(field, ev) {

    var image = _.cloneDeep(this.props.image)
    image[field] = ev.target.checked

    //automatically select "useImage" if "isDefault"
    image.useImage = (image.isDefault ? true : image.useImage)

    this.props.onChange && this.props.onChange(image)
  },
  render: function() {
    return (
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={this.props.image.path} style={this.imgStyle}/>
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{path.basename(this.props.image.path)}</h4>
          <label>
            <input
              type="checkbox"
              checked={this.props.image.useImage}
              onChange={_.partial(this.handleChange, 'useImage')} />
            Use Image for item
          </label>
          <br/>
          <label>
            <input
              type="checkbox"
              checked={this.props.image.isDefault}
              onChange={_.partial(this.handleChange, 'isDefault')}
            />
            Default Image
          </label>
        </div>
      </div>
    )
  }
})

module.exports = IlImage
