import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {removePixel, updatePixel, loadPixel} from '../reducers/pixel'

class SinglePixel extends React.Component {
  constructor(props) {
    super(props)
    this.props.loadSinglePixel(this.props.pixelId)
    this.state={
      chosenPixel: this.props.pixels.get(parseInt(this.props.pixelId)-1),
      deletedSuccesfully: false
    }
    this.removePixelCallback=this.removePixelCallback.bind(this)
    this.onUpdatePixelSubmit=this.onUpdatePixelSubmit.bind(this)
  }

  componentDidMount() {
    console.log('GETTING HERE AGAIN')
  }

  removePixelCallback(event) {
    const removeOnePixel = this.props.removeOnePixel
    removeOnePixel(this.props.pixelId)
    this.setState({deletedSuccesfully: true})
    browserHistory.push(`/deleted/${this.props.userId}`)
  }

  onUpdatePixelSubmit(event) {
    event.preventDefault()
    let updatedPixelInfo = {
      color: event.target.color.value,
      day: event.target.day.value,
      content: event.target.content.value
    }
    console.log('PIXEL INFO UPDATED', updatedPixelInfo)
    this.props.updateOnePixel(this.props.pixelId, updatedPixelInfo.color, updatedPixelInfo.day, updatedPixelInfo.content)
  }

  render() {
    let thatPixel=this.props.pixels.get(parseInt(this.props.pixelId))
    return (thatPixel)?
    (

      <div>
        {console.log('PROPSSSSSS IN SINGLE PIXEL', thatPixel)}

        <h1>{thatPixel.pixelDay} Pixel</h1>
        <div id="wrapper" style={{backgroundColor: thatPixel.pixelColor, width: `${10}vh`, height: `${10}vh`}}><p className="text">{thatPixel.pixelColor}</p></div>
        <h3>Entry: </h3>
        <p>{thatPixel.pixelContent}</p>
        <hr />
        <h3>Update Pixel Information:</h3>
        <div className="row col-lg-4">
          <form onSubmit={this.onUpdatePixelSubmit}>
            <label htmlFor="color" className="mr-sm-2">Pixel Color:</label>
            <div className="form-group">
              <input className="form-control mb-2 mr-sm-2 mb-sm-0" type="color" id="color" />
            </div>
            <a href="/mirror.html"> Click here for the mirror page to check your mood!</a>
            <br></br>
            <label htmlFor="day" className="mr-sm-2"> Day: </label>
            <div className="form-group">
              <input className="form-control" type="date" id="day" />
            </div>
            <label htmlFor="content" className="mr-sm-2">Content: </label>
            <div className="form-group">
              <textarea className="form-control" cols="40" rows="5" id="content"></textarea>
            </div>
            <button className="btn btn-default" type="submit">Update</button>
          </form>
        </div>
        <div className="row col-lg-12">
        <hr />

          <button className="btn btn-default" name="deletePixel" onClick={this.removePixelCallback}>Delete Pixel</button>

        </div>
      </div>
    ):null
  }
}

/* ---CONTAINERS--- */
const mapStateToProps = (state, ownProps) => ({
  pixels: state.pixel.pixels,
  userId: ownProps.userId,
  pixelId: ownProps.pixelId
})

const mapDispatchToProps = (dispatch) => ({
  removeOnePixel: (pixelId) => {
    dispatch(removePixel(pixelId))
  },
  updateOnePixel: (pixelId, pixelColor, pixelDay, pixelContent) => {
    console.log('DISPATCHING WORKS?', pixelColor)
    dispatch(updatePixel(pixelId, pixelColor, pixelDay, pixelContent))
  },
  loadSinglePixel: (pixelId) => {
    dispatch(loadPixel(pixelId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePixel)
