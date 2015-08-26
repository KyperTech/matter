# Matter


[![Travis build status](https://travis-ci.org/KyperTech/matter.svg?branch=master)](https://travis-ci.org/kypertech/matter)
[![Code Climate](https://codeclimate.com/github/KyperTech/matter/badges/gpa.svg)](https://codeclimate.com/github/kypertech/matter)
[![Test Coverage](https://codeclimate.com/github/KyperTech/matter/badges/coverage.svg)](https://codeclimate.com/github/KyperTech/matter)
[![Dependency Status](https://david-dm.org/kypertech/matter.svg)](https://david-dm.org/kypertech/matter)
[![devDependency Status](https://david-dm.org/kypertech/matter/dev-status.svg)](https://david-dm.org/kypertech/matter#info=devDependencies)

Common Web Application functionality such as user authentication and local/session/token storage. Matter is a javascript library that communicates with [Tessellate](https://github.com/KyperTech/tessellate).

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

