import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shop.actions'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageviewWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

      updateCollections(collectionsMap);
      this.setState({ loading: false });
    })

  }
  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`}>
          <CollectionOverviewWithSpinner isLoading={loading} {...this.props} />
        </Route>
        <Route path={`${match.path}/:collectionId`}
          render={
            (props) => <CollectionPageviewWithSpinner isLoading={loading} {...props} />
          }
        />
      </div>
    )
  }
}

const mapDispatchToPros = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToPros)(withRouter(ShopPage));