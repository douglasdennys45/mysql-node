'use strict'

exports.setup = function (options, seedLink) {
}

exports.up = function (db) {
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: 'string',
      notNull: true,
      length: 255
    }
  })
}

exports.down = function (db) {
  return db.dropTable('users')
}

exports._meta = {
  version: 1
}
