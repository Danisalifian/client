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

class SectorPos extends React.Component{

  componentDidMount() {
    const url = "http://127.0.0.1:5000/api/datateranalises/";

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
          //filter positif
          let pos = _.filter(stat,{'sentiment':'positif'})
          // Filter persektor
          let infrastruktur = _.filter(pos,{'sector':'infrastruktur'})
          let ekonomi = _.filter(pos,{'sector':'ekonomi'})
          let pendidikan = _.filter(pos,{'sector':'pendidikan'})
          let pariwisata = _.filter(pos,{'sector':'pariwisata'})
          let kesehatan = _.filter(pos,{'sector':'kesehatan'})
          let lingkungan = _.filter(pos,{'sector':'lingkungan hidup'})
          let pel_publik = _.filter(pos,{'sector':'pelayanan publik'})
          let pen_daerah = _.filter(pos,{'sector':'penataan daerah'})
          let lain = _.filter(pos,{'sector':'lain'})
          
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
          data: [8, 178, 98, 150, 40, 49, 6, 3, 535]
        }],
        
        options: {
          chart: {
            height: 350,
            type: 'bar',
            events: {
              click: function(chart, w, e) {
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
              text: 'Sentimen Positif Terhadap Bidang Pembangunan Jawa Barat',
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

      // const coba = [{
      //   data: [this.state.countEkon, this.state.countInfr, 98, 150, 40, 49, 6, 3, 535]
      // }]

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

SectorPos.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SectorPos)