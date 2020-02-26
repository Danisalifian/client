import React from 'react'
import { 
    Grid, 
    withStyles,
    Typography,
    Paper,
    Avatar
} from '@material-ui/core'
import PropTypes from 'prop-types'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import LinearProgress from '@material-ui/core/LinearProgress'
import axios from 'axios'
import _ from 'lodash'
import ReactWordCloud from 'react-wordcloud'
import ApexCharts from 'react-apexcharts'

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
      avatarpos: {
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
        color: theme.palette.error.dark,
        height: 55,
        width: 50
      },
      differenceValue: {
        color: theme.palette.error.dark,
        marginRight: theme.spacing(1)
      },
      differenceValuePos: {
        color: theme.palette.primary.main,
        marginRight: theme.spacing(1)
      },
      load: {
        width: '100%',
        height: '7px',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
      chartContainer: {
        height: 400,
        position: 'relative'
      },
      actions: {
        justifyContent: 'flex-end'
      },
})

class Details extends React.Component{
    state ={
        bulan: '',
        tahun:'',
        countPos: '',
        countNeg: '',
        kataPos: [],
        kataNeg: [],
    }

    componentDidMount(){
        const {valBulan, valTahun} = this.props.location.state
        let bulan = this.props.location.state.valBulan
        let tahun = this.props.location.state.valTahun
        this.setState({bulan, tahun})

        const url = "http://127.0.0.1:5000/api/datateranalises/"
        
        axios.get(url).then(res => {
            const datas = res.data
            // memfilter berdasarkan bulan
            datas.map(obj =>{ 
                if ((obj.month === bulan) && (obj.year === tahun))
                {
                    let stat = obj.statuses
                    //filter positif
                    let pos = _.filter(stat,{'sentiment':'positif'})
                    let countPos = pos.length
                    this.setState({countPos})

                    let kataPos = obj.wordcloudPos
                    this.setState({kataPos})

                    // Filter persektor
                    let pinfrastruktur = _.filter(pos,{'sector':'infrastruktur'})
                    let pekonomi = _.filter(pos,{'sector':'ekonomi'})
                    let ppendidikan = _.filter(pos,{'sector':'pendidikan'})
                    let ppariwisata = _.filter(pos,{'sector':'pariwisata'})
                    let pkesehatan = _.filter(pos,{'sector':'kesehatan'})
                    let plingkungan = _.filter(pos,{'sector':'lingkungan hidup'})
                    let ppel_publik = _.filter(pos,{'sector':'pelayanan publik'})
                    let ppen_daerah = _.filter(pos,{'sector':'penataan daerah'})
                    let plain = _.filter(pos,{'sector':'lain'})

                    //hitung persektor
                    let pcountInfr = pinfrastruktur.length
                    let pcountEkon = pekonomi.length
                    let pcountPend = ppendidikan.length
                    let pcountPar = ppariwisata.length
                    let pcountKes = pkesehatan.length
                    let pcountLing = plingkungan.length
                    let pcountPubl = ppel_publik.length
                    let pcountDaer = ppen_daerah.length
                    let pcountLain = plain.length

                    // setstate persektor
                    this.setState({
                        pcountInfr, 
                        pcountEkon, 
                        pcountPend,
                        pcountPar,
                        pcountKes,
                        pcountLing,
                        pcountPubl,
                        pcountDaer,
                        pcountLain
                    })
                }

                if ((obj.month === bulan) && (obj.year === tahun))
                {
                    let stat = obj.statuses
                    //filter negatif
                    let neg = _.filter(stat,{'sentiment':'negatif'})
                    let countNeg= neg.length
                    this.setState({countNeg})

                    let kataNeg = obj.wordcloudNeg
                    this.setState({kataNeg})

                    // Filter persektor
                    let ninfrastruktur = _.filter(neg,{'sector':'infrastruktur'})
                    let nekonomi = _.filter(neg,{'sector':'ekonomi'})
                    let npendidikan = _.filter(neg,{'sector':'pendidikan'})
                    let npariwisata = _.filter(neg,{'sector':'pariwisata'})
                    let nkesehatan = _.filter(neg,{'sector':'kesehatan'})
                    let nlingkungan = _.filter(neg,{'sector':'lingkungan hidup'})
                    let npel_publik = _.filter(neg,{'sector':'pelayanan publik'})
                    let npen_daerah = _.filter(neg,{'sector':'penataan daerah'})
                    let nlain = _.filter(neg,{'sector':'lain'})

                    //hitung persektor
                    let ncountInfr = ninfrastruktur.length
                    let ncountEkon = nekonomi.length
                    let ncountPend = npendidikan.length
                    let ncountPar = npariwisata.length
                    let ncountKes = nkesehatan.length
                    let ncountLing = nlingkungan.length
                    let ncountPubl = npel_publik.length
                    let ncountDaer = npen_daerah.length
                    let ncountLain = nlain.length  

                    // setstate persektor
                    this.setState({
                        ncountInfr, 
                        ncountEkon, 
                        ncountPend,
                        ncountPar,
                        ncountKes,
                        ncountLing,
                        ncountPubl,
                        ncountDaer,
                        ncountLain
                    })
                }
            })
            this.setState({isLoaded:true})
        })
    }

    constructor(props){
        super(props)

        this.state = {
            isLoaded:false,

            series: [{
                data: [11, 355, 133, 75, 69, 90, 28, 31, 152]
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
        }
    }

    render(){
        const {classes} = this.props
        const dataNeg = [{
            data: [
              this.state.ncountEkon,
              this.state.ncountInfr, 
              this.state.ncountPend, 
              this.state.ncountPar, 
              this.state.ncountKes, 
              this.state.ncountLing, 
              this.state.ncountPubl, 
              this.state.ncountDaer, 
              this.state.ncountLain]
          }]
        const dataPos = [{
        data: [
            this.state.pcountEkon,
            this.state.pcountInfr, 
            this.state.pcountPend, 
            this.state.pcountPar, 
            this.state.pcountKes, 
            this.state.pcountLing, 
            this.state.pcountPubl, 
            this.state.pcountDaer, 
            this.state.pcountLain]
        }]

        var {isLoaded} = this.state

        if (!isLoaded) {
            return <div>
                <div className={classes.root}>
                  <LinearProgress className={classes.load}/>
                  
                </div>
            </div>
        } else {

        return(
            <div>
            <h3>Bulan {this.state.bulan} {this.state.tahun}</h3>
            <Grid container spacing={2}>
                <Grid item md={4}>
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
                          <Typography
                              className={classes.differenceValue}
                              variant="h3"
                          >
                              {this.state.countNeg}
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
                              Aspirasi
                          </Typography>
                      </Grid>
                  </Grid>                      
                  </div>                    
                </Paper>
                </Grid>
                <Grid item md={4}>
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
                          <Typography
                              className={classes.differenceValuePos}
                              variant="h3"
                          >
                              {this.state.countPos}
                          </Typography>
                          </div>
                      </Grid>
                      <Grid item>
                          <Avatar className={classes.avatarpos}>
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
                              Aspirasi
                          </Typography>
                      </Grid>
                  </Grid>                      
                  </div>                    
                </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <Paper style={{padding: "16px"}}>
                    <Typography color="textSecondary" style={{fontSize:'20px', fontWeight:'400'}}>
                        Sentimen Negatif Terhadap Bidang Pembangunan Jawa Barat
                    </Typography>
                    <div className={classes.chartContainer}>
                        <ApexCharts
                        options={this.state.options} series={dataNeg} type="bar" height={400} 
                        />

                    </div>
                    </Paper> 
                </Grid>

                <Grid item md={4}>
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
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <Paper style={{padding: "16px"}}>
                    <Typography color="textSecondary" style={{fontSize:'20px', fontWeight:'400'}}>
                        Sentimen Positif Terhadap Bidang Pembangunan Jawa Barat
                    </Typography>
                    <div className={classes.chartContainer}>
                        <ApexCharts
                        options={this.state.options} series={dataPos} type="bar" height={400} 
                        />

                    </div>
                    </Paper>
                </Grid>

                <Grid item md={4}>
                    <Paper style={{padding: "16px"}}>
                    <div className={classes.chartContainer}>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                            >
                            Topik Sentimen Positif Terhadap Bidang Pembangunan Jawa Barat
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
                                fontSizes: [30, 50],
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                padding: 3,
                                rotations: 3,
                                rotationAngles: [0, 90],
                                scale: 'sqrt',
                                spiral: 'archimedean',
                                transitionDuration: 100,
                                }}

                            words={this.state.kataPos}
                            />
                        </div>

                    </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        )
    }
    }
}

Details.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Details)