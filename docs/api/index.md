
## signup

```javascript
//Signup a new user
 var signupData = {username: 'testuser1', email:'test@email.com', password: 'testpassword'}
 matter.signup(signupData).then(function(signupRes){
  console.log('New user signed up successfully. New account: ', signupRes.account)
 }, function(err){
  console.error('Error signing up:', err)
 })
```

## login

Log into application

```javascript
//Login as 'testuser1'
var loginData = {username: 'testuser1', password: 'testpassword'}
matter.login(loginData).then(function(loginRes){
 console.log('New user logged in succesfully. Account: ', loginRes.user)
}, function(err){
 console.error('Error logging in:', err)
})
```

## logout

Logout of currently logged in account

```javascript
//Logout of currently logged in account
matter.logout().then(function(loginRes){
 console.log('Logged out successfully')
}, function(err){
 console.error('Error logging out:', err)
})
```

## updateAccount

Update currently logged in user's account

```javascript
//Update current account's profile
matter.updateAccount().then(function(updatedAccount){
 console.log('Currently logged in account:', updatedAccount)
}, function(err){
 console.error('Error updating profile:', err)
})
```

## getCurrentUser

Get the account for the currently logged in user

```javascript
matter.getCurrentUser().then(function(currentAccount){
 console.log('Currently logged in account:', currentAccount)
}, function(err){
 console.error('Error logging out:', err)
})
```

## recover

Recover account by providing username

```javascript
matter.recover('testUser').then(function(updatedAccount){
 console.log('Currently logged in account:', updatedAccount)
}, function(err){
 console.error('Error updating profile:', err)
})
```

## isLoggedIn

Get current logged in status

```javascript
if(matter.isLoggedIn){
  console.log('There is currently an account logged in.')
 } else {
   console.warn('There is no account currently logged in.')
 }
```

## currentUser

Get currently logged in user

```javascript
  //Save account response to current user
  matter.currentUser = {username: 'testuser1', email: 'test@email.com'}
  console.log('New current user set:', matter.currentUser)
```

## uploadAvatar

Upload an image file as an avatar

```javascript
matter.uploadAvatar(file).then(function(imgUrl){
 console.log('Currently logged in account:', imgUrl)
}, function(err){
 console.error('Error uploading image:', err)
})
```

## Utilities

```javascript
  /* Utility to handle safley writing to localStorage, sessionStorage, and cookies
   * @return {Object}
   */
  get storage () {
    return envStorage
  }

  /** Utility to handle token writing/deleting/decoding
   * @return {Object}
   */
  get token () {
    return token
  }

  /** Utils placed in base library
   * @return {Object}
   */
  get utils () {
    return { logger, request, storage: envStorage, dom }
  }

```
