const {sequelize, DataTypes, Model} = require('./db');

const options = {sequelize, timestamps: false};

class Board extends Model {

}

Board.init({
    name: DataTypes.STRING,
}, options);


class Task extends Model {

}

Task.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
}, options);


class User extends Model {

}

User.init({
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
}, options);


Board.hasMany(Task, {as: 'tasks', foreignKey: 'BoardId'})
Task.belongsTo(Board, {foreignKey: 'BoardId'})
Board.hasMany(User, {as: 'users', foreignKey: 'BoardId'});
User.belongsTo(Board, {foreignKey: 'BoardId'});

module.exports = {Board, Task, User};