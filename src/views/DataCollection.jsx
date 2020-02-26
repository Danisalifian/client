import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import CardData from '../components/CardData'
import { Grid, withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})

class DataCollection extends React.Component{
    state = {
        dokumen: [],
    }

    constructor(props){
        super(props);

        this.state = {
            dokumen: [],
            isLoaded:false,
        }
    }

    componentDidMount() {
        const url = "http://localhost:5000/api/datateranalises/";

        axios.get(url).then(res => {
            this.setState({
                isLoaded: true,
                dokumen: res.data
            })
        })
    }

    render(){

        const { classes} = this.props

        var {isLoaded, dokumen} = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>
        } else{

        return(
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {dokumen.map( dokumen =>
                        <Grid item xs={3}>
                            <CardData key={dokumen.id} dokumen={dokumen} className={classes.paper}/>
                        </Grid>      
                    )}
                </Grid>
            </div>
        )
        }
    }
}

DataCollection.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DataCollection)