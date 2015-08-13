# matter-library


[![Travis build status](https://travis-ci.org/KyperTech/matter-library.svg?branch=master)](https://travis-ci.org/kypertech/matter-library)
[![Code Climate](https://codeclimate.com/github/KyperTech/matter-library/badges/gpa.svg)](https://codeclimate.com/github/kypertech/matter-library)
[![Test Coverage](https://codeclimate.com/github/KyperTech/matter-library/badges/coverage.svg)](https://codeclimate.com/github/KyperTech/matter-library)
[![Dependency Status](https://david-dm.org/kypertech/matter-library.svg)](https://david-dm.org/kypertech/matter-library)
[![devDependency Status](https://david-dm.org/kypertech/matter-library/dev-status.svg)](https://david-dm.org/kypertech/matter-library#info=devDependencies)

Common Web Application functionality such as authentication. Analytics/Data is available for viewing on [Matter](http://matter.kyper.io).

## Documentation

### Logout()
Log current user out
Example: 
```
Matter.logout().then(function(){ console.log('User logged out')});}
```

### Login()
Log user in provided username/email and password.

Example: 
```
Matter.login({username: 'test', password: 'test'})
.then(function(){ console.log('User logged in')});
```

###Signup()
Create a new user and login

Example: 
```
Matter.signup({username: 'test', name:'Test User', password: 'test'})
.then(function(){ console.log('User logged in')});
```

###getcurrentUser()
Get currently logged in user.

Example: 
```
Matter.getCurrentUser().then(function(){ console.log('User logged in')});
```

###getAuthToken()
Get Auth token for currently logged in user

Example: `var token = Matter.getAuthToken();`

