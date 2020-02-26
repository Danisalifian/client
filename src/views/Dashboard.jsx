import React from 'react'
import { Grid } from '@material-ui/core'

import SentimentGrowth from '../components/SentimentGrowth'
import TotalSentimentNeg from '../components/TotalSentimentNeg'
import TotalSentimentPos from '../components/TotalSentimentPos'

function Dashboard() {

    return(
        <div>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <SentimentGrowth />
                </Grid>
                <Grid item md={4}>
                    <TotalSentimentNeg/>
                    <br/>
                    <TotalSentimentPos/>
                </Grid>
            </Grid>            
        </div>
    )
}

export default(Dashboard)