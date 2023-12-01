import userbase from "userbase-js"
import { testGroup } from "./config"
import { groupUsers, wishlistItems } from "./appState"

export const initDefaultGroupId = async () => {
  return await userbase.signUp({
    username: testGroup.id,
    password: testGroup.pId,
    sessionLength: 8760,
    rememberMe: 'local'
  })
}

export const login = async () => {
  try {
    return await userbase.signIn({
      username: testGroup.id,
      password: testGroup.pId,
      sessionLength: 8760,
      rememberMe: 'local'
    })
  } catch (e) {
    if (e.name === 'UserAlreadySignedIn') {
      return
    } else {
      throw e
    }
  }
}

const onGroupUsersDatabaseChange = (rows) => { 
  console.log('onGroupUsersDatabaseChange', rows)
  groupUsers.set(rows)
}

export const initGroupUsersDatabase = async () =>
  await userbase.openDatabase({
    databaseName: 'groupUsers',
    changeHandler: onGroupUsersDatabaseChange
  }) 

export const addNewGroupUser = async displayName => {
  await userbase.insertItem({
    databaseName: 'groupUsers',
    item: {
      displayName,
    }
  })
}

export const deleteGroupUser = async id => {
  await userbase.deleteItem({
    databaseName: 'groupUsers',
    itemId: id,
  })
}

const onWishlistItemsDatabaseChange = (rows) => { 
  console.log('onWishlistItemsDatabaseChange', rows)
  wishlistItems.set(rows)
}

export const initWishlistItemsDatabase = async () =>
  await userbase.openDatabase({
    databaseName: 'wishlistItems',
    changeHandler: onWishlistItemsDatabaseChange
  })

export const addNewWishlistItem = async item => {
  await userbase.insertItem({
    databaseName: 'wishlistItems',
    item
  })
}
  
export const deleteWishlistItem = async id => {
  await userbase.deleteItem({
    databaseName: 'wishlistItems',
    itemId: id,
  })
}