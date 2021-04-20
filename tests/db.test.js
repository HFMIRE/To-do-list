const {sequelize} = require('../db/db.js');
const {Board, Task, User} = require('../db/models.js')
const {Op} = require("sequelize");

describe('Tests on the model', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true});
    })

    test("can save board data", async () => {
        await Board.create({'name': 'Test Board 1'})

        const board2 = await Board.findOne({
            where: {
                name: {
                    [Op.eq]: 'Test Board 1'
                }
            }
        })
        expect(board2.name).toEqual('Test Board 1')
    })

    test("can save user data", async () => {
        await User.create({
            'name': 'Bart Simpson',
            'avatar': 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png'
        })

        const test_user = await User.findOne({
            where: {
                name: {
                    [Op.eq]: 'Bart Simpson'
                }
            }
        })
        expect(test_user.name).toEqual('Bart Simpson')
        expect(test_user.avatar).toEqual('https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png')
    })
    test("can save task data", async () => {
        await Task.create({
            'name': "Do the Bartman",
            'description': 'Dance',
            'status': 'In Progress'

        })

        const test_task = await Task.findByPk('1')
        expect(test_task.name).toEqual('Do the Bartman')
        expect(test_task.description).toEqual('Dance')
        expect(test_task.status).toEqual('In Progress')
    })

    test("Can assign tasks to boards", async () => {
        board = await Board.create({'name': 'The Simpsons'});
        task = await Task.create({
            'name': "Do the Bartman",
            'description': 'Dance',
            'status': 'In Progress'
        })
        await board.addTask(task);

        const test_task = await Task.findOne({
            where: {
                name: {
                    [Op.eq]: 'Do the Bartman'
                },
                BoardId: {
                    [Op.eq]: board.id
                }
            }
        })
        expect(test_task.BoardId).toEqual(board.id)
    })



    test("Can assign users to tasks", async () => {
        board = await Board.create({'name': 'The Simpsons'});
        task = await Task.create({
            'name': "Learn to Walk",
            'description': 'and stop falling over',
            'status': 'To Do'
        })
        await board.addTask(task);
        user = await User.create({
            'name': "Maggie Simpson",

        })

        //await user.addTask(task)
        await task.setUser(user)
        const test_user = await User.findByPk(user.id)
        const test_task = await Task.findByPk(task.id)

        expect(test_task.UserId).toEqual(test_user.id)
    })
})