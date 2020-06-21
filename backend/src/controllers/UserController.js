const md5 = require('md5');
const connection = require('../database/connection');

module.exports = {
    async login(request, response) {
        const { username, password } = request.body;
        const users = await connection('users')
                    .where('username', username)
                    .andWhere('password', md5(password))
                    .first('id', 'name', 'username', 'user_token', 'picture');
    
        //TODO: atualizar o user_token a cada login, expirar depois de um tempo

        return users 
                ? 
               response.json(users) 
                :
               response.status(401).json({"error": "Login ou senha inválidos"});  
      },
  
  async index(request, response) {
    const users = await connection('users')
                .select('id', 'name', 'username', 'user_token', 'picture');

    return response.json(users);
  },

  async create(request, response) {
    const { username, password, name } = request.body;
    const picture = `https://api.adorable.io/avatars/200/${username}.png`;
    
    const [id] = await connection('users').insert({ 
        username, 
        password: md5(password), 
        name, 
        picture,
        user_token: md5(username), 
        active: true 
    });
    const user = await connection('users')
                    .first('id', 'name', 'username', 'user_token', 'picture')
                    .where('id', id);

    return response.json(user);
  },

  async delete(request, response) {
    const { id } = request.params;

    //todo: apenas deixar o próprio usuário deletar!

    await connection('users').where('id', id).delete();
    return response.status(204).send();
  },

  async update(request, response) {
    const { name, username, password } = request.body;
    const { id } = request.params;

    //todo: apenas deixar o próprio usuário atualizar!

    let data = { name, username };
    if (password.trim()) {
        data.password = md5(password);
    }

    const user = await connection('users')
                        .where('id', id)
                        .first('id', 'name', 'username', 'user_token', 'picture');
    await connection('users').where('id', id).update(data);

    return response.json({ ...user, name });
  }
  
};