# storage
a storage lib which support sessionStorage and localStorage with the same api

## Install

```
 npm install good-storage
```

## Usage

```
 import storage from 'good-storage'
 
 // localStorage
 storage.set(key,val) 
 
 storage.get(key, def)
 
 // sessionStorage
 storage.session.set(key, val)
 
 storage.session.get(key, val)
 
```

## API

#### set(key, val)

set storage with key and val

#### get(key, def)

get storage with key, return def if not find

#### remove(key)

remove storage with key

#### has(key)

determine storage has the key

#### clear()
clear all storages

#### getAll()
get all the storages

#### forEach(callback)
forEach the storages and call the callback function with each storage
