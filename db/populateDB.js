const {sequelize} = require('./db');
const {Board, Task, User} = require('./models');
const fsp = require('fs').promises;
const path = require('path');

function resetDB() {
    return sequelize.sync({force: true});
}

async function loadBoards() {
    const filePath = path.join(__dirname, 'initial_tasks.json');
    const buffer = await fsp.readFile(filePath);
    return JSON.parse(String(buffer));
}


async function populateDB() {
    await resetDB();
    const boards = await loadBoards();
    for (const boardData of boards) {
        const board = await Board.create({
            name: boardData.name,
        });

        for (const userData of boardData.users) {
            const user = await User.create({
                name: userData.name,
                avatar: userData.avatar
            });


        for (const taskData of boardData.tasks) {
            const task = await Task.create({
                name: taskData.name,
                description: taskData.description,
                status: taskData.status,
            });
            await board.addTask(task);
            await task.setUser(user);
        }

        }

    }
}

module.exports = populateDB;
