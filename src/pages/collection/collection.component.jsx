import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import CollectionItem from '../../components/collection-item/collection-item.component'

import { selectCollection } from '../../redux/shop/shop.selector'

import './collection.styles.scss'

const CollectionPage = ({ collection, match }) => {
  const { title, items } = collection;

  console.log(match);

  return (
    <div className="collection-page">
      <h2 className='title'>{title}</h2>
      <div className="items">
        {
          items.map(item => <CollectionItem key={item.id} item={item} />)
        }
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  collection: selectCollection
})
// const mapStateToProps = (state, ownProps) => ({
//   collection: selectCollection(ownProps.match.params.collectionId)(state)
// });


export default withRouter(connect(mapStateToProps)(CollectionPage));