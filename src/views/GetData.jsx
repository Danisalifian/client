import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box
} from '@material-ui/core'
import axios from 'axios'
import swal from 'sweetalert'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {},
  chartContainer: {
    height: '28%',
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
})

class GetData extends React.Component{

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.createData = this.createData.bind(this)

    this.state = {
      keyword: '',
      tweets: [],
      redirect: '',
      isWait: false,
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  createData = () => {
    const url = 'http://35.247.179.199/api/data-tweet'
    let word = this.state.keyword

    this.setState({isWait: true})

    axios.post(url,{
      keyword: word
    })
    .then( (response) => {
      // console.log('pesan suskes: ',response)
      swal({
        title: "Data berhasil disimpan",
        icon: "success",
        closeOnClickOutside: false,
      });
      this.setState({isWait: false})
    })
    .catch((error) => {
      // console.log('pesan gagal: ',error)
    })
  }

  render() {
    const { classes } = this.props
    const isWait = this.state.isWait

    // console.log('val : ',isWait)
    return(
      <div>

        <Paper style={{padding: "16px", marginLeft:"100px", marginRight:"100px"}}>
          <Box display="flex" justifyContent="center" >
          <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="h6"
          >
          Get Twitter Data
          </Typography>
          </Box>

          <Box display="flex" justifyContent="center" >
          <TextField
            id="keyword"
            name="keyword"
            label="Kata kunci"
            // className={classes.textField}
            style={{width:"90%"}}
            margin="normal"
            variant="outlined"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          </Box>

          <Box display="flex" justifyContent="center" >
          {isWait ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{width: '20%', marginTop:"10px"}}
              // onClick={this.createData}
            >
              Please Wait <CircularProgress size={20} thickness={4} style={{color: '#ffffff', marginLeft: '15px'}}/>
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{width: '20%', marginTop:"10px"}}
              onClick={this.createData}
            >
              Get Data
            </Button>
          )}
          
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{width: '20%', marginTop:"10px"}}
            onClick={this.createData}
          >
            Get Data
          </Button> */}
          </Box>        
        </Paper>
      </div>
    )
  }
}

GetData.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GetData)