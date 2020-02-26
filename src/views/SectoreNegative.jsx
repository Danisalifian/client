import React from 'react'

import SectorNeg from '../components/SectorNeg'
import TopicNeg from '../components/TopicNeg'
import { Grid } from '@material-ui/core'

function SectorNegative(){
    return(
        <div>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <SectorNeg />
                </Grid>
                <Grid item md={4}>
                    <TopicNeg />
                </Grid>
            </Grid>
        </div>
    )
}

export default(SectorNegative)