import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Paper, Box
} from '@material-ui/core'
import axios from 'axios'
import _ from 'lodash'
import LinearProgress from '@material-ui/core/LinearProgress'

// Apex Charts
import ApexCharts from 'react-apexcharts'

const styles = theme => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  load: {
    width: '100%',
    height: '7px',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
})

class SentimentGrowth extends React.Component{

  componentDidMount() {
    const url = "http://localhost:5000/api/datateranalises"

      var d = new Date()
      var bulanNow = 10 //d.getMonth()
      d.setMonth(bulanNow)
      var bulanstrNow = d.toString().substring(4,7)

      var d1 = new Date()
      var bulanPrev1 = bulanNow - 1
      d1.setMonth(bulanPrev1)
      var bulanstrPrev1 = d1.toString().substring(4,7)

      var d2 = new Date()
      var bulanPrev2 = bulanNow - 2
      d2.setMonth(bulanPrev2)
      var bulanstrPrev2 = d2.toString().substring(4,7)

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

      if (bulanstrPrev1 === 'Jan'){
        var bulanstr1 = 'Januari'
      } else if (bulanstrPrev1 === 'Feb'){
        var bulanstr1 = 'Februari'
      } else if (bulanstrPrev1 === 'Mar'){
        var bulanstr1 = 'Maret'
      } else if (bulanstrPrev1 === 'Apr'){
        var bulanstr1 = 'April'
      } else if (bulanstrPrev1 === 'May'){
        var bulanstr1 = 'Mei'
      } else if (bulanstrPrev1 === 'Jun'){
        var bulanstr1 = 'Juni'
      } else if (bulanstrPrev1 === 'Jul'){
        var bulanstr1 = 'Juli'
      } else if (bulanstrPrev1 === 'Aug'){
        var bulanstr1 = 'Agustus'
      } else if (bulanstrPrev1 === 'Sep'){
        var bulanstr1 = 'September'
      } else if (bulanstrPrev1 === 'Oct'){
        var bulanstr1 = 'Oktober'
      } else if (bulanstrPrev1 === 'Nov'){
        var bulanstr1 = 'November'
      } else if (bulanstrPrev1 === 'Dec'){
        var bulanstr1 = 'Desember'
      }

      if (bulanstrPrev2 === 'Jan'){
        var bulanstr2 = 'Januari'
      } else if (bulanstrPrev2 === 'Feb'){
        var bulanstr2 = 'Februari'
      } else if (bulanstrPrev2 === 'Mar'){
        var bulanstr2 = 'Maret'
      } else if (bulanstrPrev2 === 'Apr'){
        var bulanstr2 = 'April'
      } else if (bulanstrPrev2 === 'May'){
        var bulanstr2 = 'Mei'
      } else if (bulanstrPrev2 === 'Jun'){
        var bulanstr2 = 'Juni'
      } else if (bulanstrPrev2 === 'Jul'){
        var bulanstr2 = 'Juli'
      } else if (bulanstrPrev2 === 'Aug'){
        var bulanstr2 = 'Agustus'
      } else if (bulanstrPrev2 === 'Sep'){
        var bulanstr2 = 'September'
      } else if (bulanstrPrev2 === 'Oct'){
        var bulanstr2 = 'Oktober'
      } else if (bulanstrPrev2 === 'Nov'){
        var bulanstr2 = 'November'
      } else if (bulanstrPrev2 === 'Dec'){
        var bulanstr2 = 'Desember'
      }

    axios.get(url).then(res => {
      const datas = res.data

      let bulan = bulanstr.toLowerCase() //'november'
      let bulanprev1 = bulanstr1.toLowerCase()
      let bulanprev2 = bulanstr2.toLowerCase()

      let tahunNow = new Date().getFullYear().toString();
      let tahun = '2019'
      this.setState({bulan})
      // memfilter berdasarkan bulan sekarang
      datas.map(obj =>{ 
        if ((obj.month === bulan) && (obj.year === tahun))
        {
          let stat = obj.statuses
          //filter positif
          let pos = _.filter(stat,{'sentiment':'positif'})
          let countPos = pos.length
          this.setState({countPos})
          
          //filter negatif
          let neg = _.filter(stat,{'sentiment':'negatif'})
          let countNeg = neg.length
          this.setState({countNeg})
        }

        if((obj.month === bulanprev1) && (obj.year === tahun))
        {
          let stat1 = obj.statuses
          let pos1 = _.filter(stat1, {'sentiment':'positif'})
          let countPos1 = pos1.length
          this.setState({countPos1})

          let neg1 = _.filter(stat1,{'sentiment':'negatif'})
          let countNeg1 = neg1.length
          this.setState({countNeg1})
        }

        if((obj.month === bulanprev2) && (obj.year === tahun))
        {
          let stat2 = obj.statuses
          let pos2 = _.filter(stat2, {'sentiment':'positif'})
          let countPos2 = pos2.length
          this.setState({countPos2})

          let neg2 = _.filter(stat2,{'sentiment':'negatif'})
          let countNeg2 = neg2.length
          this.setState({countNeg2})
          this.setState({isLoaded:true})
        }
      })

    })
  }

  constructor(props){
    super(props);

    this.state = {
      isLoaded:false,

      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enable: false
          },
          toolbar: {
            show: false
          },
        },
        colors: ['#0d47a1', '#b71c1c'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Perkembangan Sentimen Warga Jawa Barat',
          align: 'left',
          style: {
            fontSize:  '20px',
            color:  '#807171'
          }
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 6
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          formatter: function (val, opts) {
              return val
          },
          textAnchor: 'middle',
          offsetX: 0,
          offsetY: -20,
          style: {
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              colors: undefined
          },
          background: {
            enabled: false,
            foreColor: '#fff',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9
          },
          dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            offsetX: 3
          }
        },
        xaxis: {
          categories: ['Sep', 'Okt', 'Nov'],
          title: {
            text: 'Bulan'
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -15,
          offsetX: -5,
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
          },
        },
      }
    }
  }

  render() {
    const { classes } = this.props

    const arraydata = [
      {
        name: "Sentimen Positif",
        data: [this.state.countPos2, this.state.countPos1, this.state.countPos]
      },
      {
        name: "Sentimen Negatif",
        data: [this.state.countNeg2, this.state.countNeg1, this.state.countNeg]
      }
    ]

    var {isLoaded} = this.state

    if (!isLoaded) {
      return <div>
        <div className={classes.root}>
          <LinearProgress className={classes.load} />
        </div>
      </div>
    } else{

    return(
      <div>
        <Paper style={{padding: "16px"}}>
          <div className={classes.chartContainer}>
            <ApexCharts
              options={this.state.options} series={arraydata} type="line" height="400" 
            />

          </div>
        </Paper>
      </div>
    )
    }
  }
}

SentimentGrowth.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SentimentGrowth)