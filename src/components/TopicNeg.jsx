import React from 'react'
import { withStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Paper
} from '@material-ui/core'
import ReactWordCloud from 'react-wordcloud'
import axios from 'axios'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
    root: {},
    chartContainer: {
      height: 400,
      position: 'relative'
    },
    actions: {
      justifyContent: 'flex-end'
    },    
    title: {
        fontWeight: 700
    },
    load: {
      width: '100%',
      height: '7px',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    }
  })

class TopicNeg extends React.Component{
  state = {
    datas: [],
    kataNeg: [],
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData = () => {
    const url = "http://127.0.0.1:5000/api/datateranalises/";

    axios.get(url).then(res => {
      const datas = res.data

      let bulan = 'november'
      let tahun = '2019'
      this.setState({bulan})
      datas.map(obj =>{
        if ((obj.month === bulan) && (obj.year === tahun))
        {
          let kataNeg = obj.wordcloudNeg
          this.setState({kataNeg})
        }
      })
      this.setState({datas})
      this.setState({isLoaded: true})
    })
  }

  constructor(props){
    super(props)
    this.fetchData = this.fetchData.bind(this)

    this.state = {
      isLoaded: false,
    }
  }

  render(){
    const { classes } = this.props

    var {isLoaded} = this.state

    if (!isLoaded) {
      return <div>
      <div className={classes.root}>
        <LinearProgress className={classes.load} />
      </div>
    </div>
    } else {

    return(
      <div>
          <Paper style={{padding: "16px"}}>
          <div className={classes.chartContainer}>
              <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                  >
                  Topik Sentimen Negatif Terhadap Bidang Pembangunan Jawa Barat
              </Typography>

              <div style={{height: '90%', width:'100%', backgroundColor: '#efefef'}}>
                  <ReactWordCloud 
                  options={{
                      colors: [
                        '#1f77b4',
                        '#ff7f0e',
                        '#2ca02c',
                        '#d62728',
                        '#9467bd',
                        '#8c564b',
                      ],
                      enableTooltip: true,
                      deterministic: false,
                      fontFamily: 'Roboto',
                      fontSizes: [25, 60],
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                      padding: 5,
                      rotations: 3,
                      rotationAngles: [0, 90],
                      scale: 'sqrt',
                      spiral: 'archimedean',
                      transitionDuration: 100,
                    }}
                  words={this.state.kataNeg}
                  />
              </div>
          </div>
          </Paper>
      </div>
    )
    }
  }
}

TopicNeg.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TopicNeg)