import React from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Avatar, withStyles, Paper } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import axios from 'axios'
import _ from 'lodash'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
    root: {
        height: '200',
        width: '200',
      },
      content: {
        alignItems: 'center',
        display: 'flex',
      },
      title: {
        fontWeight: 700
      },
      avatar: {
        backgroundColor: theme.palette.error.main,
        height: 56,
        width: 56
      },
      icon: {
        height: 38,
        width: 38
      },
      difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
      },
      differenceIcon: {
        color: theme.palette.error.dark,
        height: 55,
        width: 50
      },
      differenceValue: {
        color: theme.palette.error.dark,
        marginRight: theme.spacing(1)
      },
      load: {
        width: '100%',
        height: '7px',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      }
})

class TotalSentimentNeg extends React.Component{
  state = {
    countNeg: '',
    countNeg1: '',
    persentase:'',
  }

  componentDidMount() {
    const url = "http://127.0.0.1:5000/api/datateranalises/"

    var d = new Date()
    var bulanNow = 10 //d.getMonth()
    d.setMonth(bulanNow)
    var bulanstrNow = d.toString().substring(4,7)

    var d1 = new Date()
    var bulanPrev = bulanNow - 1
    d1.setMonth(bulanPrev)
    var bulanstrPrev = d1.toString().substring(4,7)
    let bulanstr
    let bulanstr1

    if (bulanstrNow === 'Jan'){
      bulanstr = 'Januari'
    } else if (bulanstrNow === 'Feb'){
      bulanstr = 'Februari'
    } else if (bulanstrNow === 'Mar'){
      bulanstr = 'Maret'
    } else if (bulanstrNow === 'Apr'){
      bulanstr = 'April'
    } else if (bulanstrNow === 'May'){
      bulanstr = 'Mei'
    } else if (bulanstrNow === 'Jun'){
      bulanstr = 'Juni'
    } else if (bulanstrNow === 'Jul'){
      bulanstr = 'Juli'
    } else if (bulanstrNow === 'Aug'){
      bulanstr = 'Agustus'
    } else if (bulanstrNow === 'Sep'){
      bulanstr = 'September'
    } else if (bulanstrNow === 'Oct'){
      bulanstr = 'Oktober'
    } else if (bulanstrNow === 'Nov'){
      bulanstr = 'November'
    } else if (bulanstrNow === 'Dec'){
      bulanstr = 'Desember'
    }

    if (bulanstrPrev === 'Jan'){
      bulanstr1 = 'Januari'
    } else if (bulanstrPrev === 'Feb'){
      bulanstr1 = 'Februari'
    } else if (bulanstrPrev === 'Mar'){
      bulanstr1 = 'Maret'
    } else if (bulanstrPrev === 'Apr'){
      bulanstr1 = 'April'
    } else if (bulanstrPrev === 'May'){
      bulanstr1 = 'Mei'
    } else if (bulanstrPrev === 'Jun'){
      bulanstr1 = 'Juni'
    } else if (bulanstrPrev === 'Jul'){
      bulanstr1 = 'Juli'
    } else if (bulanstrPrev === 'Aug'){
      bulanstr1 = 'Agustus'
    } else if (bulanstrPrev === 'Sep'){
      bulanstr1 = 'September'
    } else if (bulanstrPrev === 'Oct'){
      bulanstr1 = 'Oktober'
    } else if (bulanstrPrev === 'Nov'){
      bulanstr1 = 'November'
    } else if (bulanstrPrev === 'Dec'){
      bulanstr1 = 'Desember'
    }

    axios.get(url).then(res => {
      const datas = res.data

      let bulan = bulanstr.toLowerCase() //'november'
      let bulanlalu = bulanstr1.toLowerCase()
      let tahun = '2019'
      // memfilter berdasarkan bulan
      datas.map(obj =>{ 
          if ((obj.month === bulan) && (obj.year === tahun))
          {
            let stat = obj.statuses
            //filter positif
            let neg = _.filter(stat,{'sentiment':'negatif'})
            let countNeg= neg.length
            this.setState({countNeg})
          }

          if ((obj.month === bulanlalu) && (obj.year === tahun))
          {
            let stat1 = obj.statuses
            //filter positif
            let neg1 = _.filter(stat1,{'sentiment':'negatif'})
            let countNeg1 = neg1.length
            this.setState({countNeg1})
            this.setState({isLoaded:true})
          }
        })
    })
  }

  constructor(props){
      super(props);

      this.state = {
        isLoaded:false,
      }
  }

  render() {

    const {classes} = this.props

    var {isLoaded} = this.state
    var persentase = (this.state.countNeg - this.state.countNeg1) / this.state.countNeg1*100
    let panah

    if ( persentase > 0 ){
      panah = <ArrowUpwardIcon className={classes.differenceIcon} />
    } else {
      panah = <ArrowDownwardIcon className={classes.differenceIcon} />
    }

    if (!isLoaded) {
      return <div>
          <div className={classes.root}>
            <LinearProgress className={classes.load}/>
          </div>
        </div>
    } else {

      return(
          <div>
              <Paper style={{padding: "16px"}}>
                  <Grid
                  container
                  justify="space-between"
                  >
                      <Grid item>
                          <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                          variant="body2"
                          >
                          Total Sentimen Negatif
                          </Typography>

                          <div className={classes.difference}>
                          {/* <ArrowUpwardIcon className={classes.differenceIcon} /> */}
                          {panah}
                          <Typography
                              className={classes.differenceValue}
                              variant="h3"
                          >
                              {Math.abs(persentase.toFixed())}%
                          </Typography>
                          </div>
                      </Grid>
                      <Grid item>
                          <Avatar className={classes.avatar}>
                          <SentimentDissatisfiedIcon className={classes.icon} />
                          </Avatar>
                      </Grid>
                  </Grid>
                  <div className={classes.difference}>
                  <Grid
                  container
                  justify="space-between"
                  >
                      <Grid item>
                      <Typography
                              className={classes.title}
                              color="textSecondary"
                              gutterBottom
                              variant="body2"
                          >
                              dari bulan lalu
                          </Typography>
                      </Grid>
                      <Grid item>
                          <span>
                          </span>
                          <Typography
                              className={classes.title}
                              color="textSecondary"
                              gutterBottom
                              variant="body2"
                          >
                              {/* {this.state.countStatuses} */}
                              {this.state.countNeg} Aspirasi
                          </Typography>
                      </Grid>
                  </Grid>                      
                  </div>                    
              </Paper>
          </div>
      )
    }
  }
}

TotalSentimentNeg.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TotalSentimentNeg);