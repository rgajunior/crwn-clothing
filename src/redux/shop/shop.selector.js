import { createSelector } from 'reselect'

const selectShop = state => state.shop;

const selectCollectionUrlParam = (state, ownProps) => ownProps.match.params.collectionId;

export const selectCollections = createSelector(
  selectShop,
  shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  selectCollections,
  collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = createSelector(
  selectCollections,
  selectCollectionUrlParam,
  (collections, selectCollectionUrlParam) => {
    return collections ? collections[selectCollectionUrlParam] : null
  }
)
