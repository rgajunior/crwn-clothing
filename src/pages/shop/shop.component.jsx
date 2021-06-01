import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'


const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`}>
      <CollectionOverview />
    </Route>
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
)


export default withRouter(ShopPage);