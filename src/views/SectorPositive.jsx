import React from 'react'
import { Grid } from '@material-ui/core'

import SectorPos from '../components/SectorPos'
import TopicPos from '../components/TopicPos'

function SectorPositive() {
    return(
        <div>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <SectorPos/>
                </Grid>
                <Grid item md={4}>
                    <TopicPos />
                </Grid>
            </Grid>
        </div>
    )
}

export default(SectorPositive)