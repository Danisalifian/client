import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Paper
} from '@material-ui/core'
import ApexCharts from 'react-apexcharts'
import axios from 'axios'
import _ from 'lodash'
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
    load: {
      width: '100%',
      height: '7px',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    }
})

class SectorNeg extends React.Component{

  componentDidMount() {
    const url = "http://127.0.0.1:5000/api/datateranalises/"

    axios.get(url).then(res => {
      const datas = res.data

      let bulan = 'november'
      let tahun = '2019'
      this.setState({bulan})
      // memfilter berdasarkan bulan
      datas.map(obj =>{ 
        if ((obj.month === bulan) && (obj.year === tahun))
        {
          let stat = obj.statuses
          //filter negatif
          let neg = _.filter(stat,{'sentiment':'negatif'})
          // Filter persektor
          let infrastruktur = _.filter(neg,{'sector':'infrastruktur'})
          let ekonomi = _.filter(neg,{'sector':'ekonomi'})
          let pendidikan = _.filter(neg,{'sector':'pendidikan'})
          let pariwisata = _.filter(neg,{'sector':'pariwisata'})
          let kesehatan = _.filter(neg,{'sector':'kesehatan'})
          let lingkungan = _.filter(neg,{'sector':'lingkungan hidup'})
          let pel_publik = _.filter(neg,{'sector':'pelayanan publik'})
          let pen_daerah = _.filter(neg,{'sector':'penataan daerah'})
          let lain = _.filter(neg,{'sector':'lain'})
          
          //hitung persektor
          let countInfr = infrastruktur.length
          let countEkon = ekonomi.length
          let countPend = pendidikan.length
          let countPar = pariwisata.length
          let countKes = kesehatan.length
          let countLing = lingkungan.length
          let countPubl = pel_publik.length
          let countDaer = pen_daerah.length
          let countLain = lain.length          

          // setstate persektor
          this.setState({
            countInfr, 
            countEkon, 
            countPend,
            countPar,
            countKes,
            countLing,
            countPubl,
            countDaer,
            countLain
          })
          this.setState({isLoaded: true})
        }
      })
    })
  }

  constructor(props) {
      super(props);

      this.state = {
        isLoaded: false,
      
        series: [{
          data: [11, 355, 133, 75, 69, 90, 28, 31, 152]
        }],
        
        options: {
          chart: {
            height: 350,
            type: 'bar',
            events: {
              click: function(chart, w, e) {
                console.log(e)
              }
            },
            toolbar: {
              show: false
            },
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '12px',
              colors: ["#807171"]
            },
            offsetY: -20,
          },
          legend: {
            show: false
          },
          title: {
              text: 'Sentimen Negatif Terhadap Bidang Pembangunan Jawa Barat',
              align: 'left',
              style: {
                fontSize:  '20px',
                color:  '#807171'
              }
          },
          xaxis: {
            categories: [
              ['Ekonomi'],
              ['Infrastruktur'],
              ['Pendidikan'],
              ['Pariwisata'],
              ['Kesehatan'],
              ['Lingkungan','Hidup'],
              ['Pelayanan','Publik'],
              ['Penataan','Daerah'], 
              ['Lainnya'],
            ],
            labels: {
              style: {
                colors: [],
                fontSize: '12px'
              }
            },
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
        },    
      };
  }

  render() {
    const { classes } = this.props

    const data = [{
      data: [
        this.state.countEkon,
        this.state.countInfr, 
        this.state.countPend, 
        this.state.countPar, 
        this.state.countKes, 
        this.state.countLing, 
        this.state.countPubl, 
        this.state.countDaer, 
        this.state.countLain]
    }]

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
                  <ApexCharts
                  options={this.state.options} series={data} type="bar" height={400} 
                  />

              </div>
              </Paper>            
          </div>
      )
    }
  }
}

SectorNeg.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SectorNeg)