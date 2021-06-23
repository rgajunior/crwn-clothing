import React, { useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container'

import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])

  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`}>
        <CollectionsOverviewContainer />
      </Route>
      <Route path={`${match.path}/:collectionId`} >
        <CollectionPageContainer />
      </Route>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(withRouter(ShopPage));