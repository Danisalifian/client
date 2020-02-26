import React from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Avatar, withStyles, Paper} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
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
        backgroundColor: theme.palette.primary.main,
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
        color: theme.palette.primary.main,
        height: 55,
        width: 50
      },
      differenceValue: {
        color: theme.palette.primary.main,
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

class TotalSentimentPos extends React.Component{
  state = {
    countPos: '',
    countPos1: '',
    persentase:'',
  }

  componentDidMount() {
    const url = "http://localhost:5000/api/datateranalises/"

    var d = new Date()
    var bulanNow = 10 //d.getMonth()
    d.setMonth(bulanNow)
    var bulanstrNow = d.toString().substring(4,7)

    var d1 = new Date()
    var bulanPrev = bulanNow - 1
    d1.setMonth(bulanPrev)
    var bulanstrPrev = d1.toString().substring(4,7)

    if (bulanstrNow === 'Jan'){
      var bulanstr = 'Januari'
    } else if (bulanstrNow === 'Feb'){
      var bulanstr = 'Februari'
    } else if (bulanstrNow === 'Mar'){
      var bulanstr = 'Maret'
    } else if (bulanstrNow === 'Apr'){
      var bulanstr = 'April'
    } else if (bulanstrNow === 'May'){
      var bulanstr = 'Mei'
    } else if (bulanstrNow === 'Jun'){
      var bulanstr = 'Juni'
    } else if (bulanstrNow === 'Jul'){
      var bulanstr = 'Juli'
    } else if (bulanstrNow === 'Aug'){
      var bulanstr = 'Agustus'
    } else if (bulanstrNow === 'Sep'){
      var bulanstr = 'September'
    } else if (bulanstrNow === 'Oct'){
      var bulanstr = 'Oktober'
    } else if (bulanstrNow === 'Nov'){
      var bulanstr = 'November'
    } else if (bulanstrNow === 'Dec'){
      var bulanstr = 'Desember'
    }

    if (bulanstrPrev === 'Jan'){
      var bulanstr1 = 'Januari'
    } else if (bulanstrPrev === 'Feb'){
      var bulanstr1 = 'Februari'
    } else if (bulanstrPrev === 'Mar'){
      var bulanstr1 = 'Maret'
    } else if (bulanstrPrev === 'Apr'){
      var bulanstr1 = 'April'
    } else if (bulanstrPrev === 'May'){
      var bulanstr1 = 'Mei'
    } else if (bulanstrPrev === 'Jun'){
      var bulanstr1 = 'Juni'
    } else if (bulanstrPrev === 'Jul'){
      var bulanstr1 = 'Juli'
    } else if (bulanstrPrev === 'Aug'){
      var bulanstr1 = 'Agustus'
    } else if (bulanstrPrev === 'Sep'){
      var bulanstr1 = 'September'
    } else if (bulanstrPrev === 'Oct'){
      var bulanstr1 = 'Oktober'
    } else if (bulanstrPrev === 'Nov'){
      var bulanstr1 = 'November'
    } else if (bulanstrPrev === 'Dec'){
      var bulanstr1 = 'Desember'
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
            let pos = _.filter(stat,{'sentiment':'positif'})
            let countPos = pos.length
            this.setState({countPos})
          }

          if ((obj.month === bulanlalu) && (obj.year === tahun))
          {
            let stat1 = obj.statuses
            //filter positif
            let pos1 = _.filter(stat1,{'sentiment':'positif'})
            let countPos1 = pos1.length
            this.setState({countPos1})
            this.setState({isLoaded:true})
          }
        })
    })
  }

  constructor(props){
      super(props)  

      this.state = {
        isLoaded:false,
      }
  }

  render() {

    const {classes} = this.props

    var {isLoaded} = this.state
    var persentase = (this.state.countPos - this.state.countPos1) / this.state.countPos1*100
    // untuk contoh negatif
    // var persentase = (200-300)/300*100
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
                      Total Sentimen Positif
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
                      <SentimentSatisfiedIcon className={classes.icon} />
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
                        {this.state.countPos} Aspirasi
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

TotalSentimentPos.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TotalSentimentPos);