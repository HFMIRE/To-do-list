const {sequelize, DataTypes, Model} = require('./db');

const options = {sequelize};

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



// Board to task relationship
Board.hasMany(Task, {as: 'tasks', foreignKey: 'BoardId'})
Task.belongsTo(Board, {foreignKey: 'BoardId'})
// Board to user relationship
UserBoards = sequelize.define('UserBoards', {})
Board.belongsToMany(User, {through: UserBoards});
User.belongsToMany(Board, {through: UserBoards})
// Task to user relationship
UserTasks = sequelize.define('UserTasks', {})
Task.belongsToMany(User, {through: UserTasks});
User.belongsToMany(Task, {through: UserTasks})


module.exports = {Board, Task, User};