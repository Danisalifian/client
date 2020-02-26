import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import {
    Card,
    CardContent,
    CardActions,
    Divider,
    Button,
    Grid,
    Avatar
} from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        height: 56,
        width: 56
    },
})

class DataCollectionCard extends React.Component{
  state = {
    dokumen: []
  }

  constructor(props){
    super(props)
    this.clickDetail = this.clickDetail.bind(this)

    this.state ={
      bulan: '',
      tahun: '',
    }
  }

  clickDetail = () => {
    // console.log('tombol di klik')

    const bulan = this.props.dokumen.month
    const tahun = this.props.dokumen.year
    this.setState({bulan})
    this.setState({tahun})
    // console.log(bulan)
    // console.log(tahun)
  }

  render(){

    const {classes} = this.props
    const {dokumen} = this.props

    return(
      <div>
        <Card className={classes.card}>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item>
                    <Avatar className={classes.avatar}>
                        <TwitterIcon className={classes.icon}/>
                    </Avatar>
                </Grid>
                <Grid item>
                  <Typography style={{fontWeight: 'bold'}}  gutterBottom>
                    {dokumen.month} {dokumen.year}
                  </Typography><br/>
                </Grid>
            </Grid>
        </CardContent>
        <Divider/>
        <CardActions>
        <Button variant="contained" className={classes.button} color="primary"
         component={Link} 
        //  to={"/detail"}
        to={{
          pathname: '/detail',
          state: {
            valBulan: this.props.dokumen.month,
            valTahun: this.props.dokumen.year
          }
        }}
         onClick={this.clickDetail}
         >
            Detail
        </Button>
        </CardActions>      
      </Card>
    <br/>
    </div>
    )
  }
}

DataCollectionCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DataCollectionCard)