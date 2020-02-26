import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import SectorPositive from './views/SectorPositive'
import SectorNegative from './views/SectoreNegative'
import DataCollection from './views/DataCollection'
import Details from './views/Details'
import GetData from './views/GetData'
import Login from './views/Login'
import Navbar from './components/Navbar'
import {ProtectedRoute} from './protectedRoute'

function Routes() {
    return(
        <div>
            <Switch>
                <Route exact path="/" component={Login} />             
                <Navbar>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/sektor-sentimen-positif" component={SectorPositive} />
                    <Route exact path="/sektor-sentimen-negatif" component={SectorNegative} />
                    <Route exact path="/data-collection" component={DataCollection} />
                    <Route exact path="/detail" component={Details} />
                    <Route exact path="/get-data" component={GetData} />

                    {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                    <ProtectedRoute exact path="/sektor-sentimen-positif" component={SectorPositive} />
                    <ProtectedRoute exact path="/sektor-sentimen-negatif" component={SectorNegative} />
                    <ProtectedRoute exact path="/data-collection" component={DataCollection} />
                    <ProtectedRoute exact path="/detail" component={Details} />
                    <ProtectedRoute exact path="/get-data" component={GetData} /> */}
                </Navbar>

            </Switch>
        </div>
    )
}

export default(Routes)