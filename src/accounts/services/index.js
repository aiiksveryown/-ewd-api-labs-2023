import Account from '../entities/Account';

export default {
  registerAccount: async (firstName, lastName, email, password, { accountsRepository, authenticator }) => {
    password = await authenticator.encrypt(password);
    const account = new Account(undefined, firstName, lastName, email, password);
    return accountsRepository.persist(account);
  },
  getAccount: (accountId, {accountsRepository}) => {
    return accountsRepository.get(accountId);
  },
  find: ({accountsRepository})=>{
    return accountsRepository.find();
  },
  findByEmail: (email, {accountsRepository})=>{
    return accountsRepository.getByEmail(email);
  },
  updateAccount: (id, firstName, lastName, email, password, { accountsRepository, authenticator }) => {
    password = authenticator.encrypt(password);
    return accountsRepository.merge(new Account(id, firstName, lastName, email, password));
  },
  authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
    const account = await accountsRepository.getByEmail(email);
    const result = await authenticator.compare(password, account.password);
    if (!result) {
      throw new Error('Bad credentials');
    }
    const token = tokenManager.generate({ email: account.email });
    return {token, id: account.id};
  },
  getFavourites: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.favourites;
  },
  addFavourite: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    
    // check if movie is already in favourites array
    if (account.favourites.includes(movieId)) {
      throw new Error(`Movie with ID ${movieId} is already in favourites`);
    }
    
    account.favourites.push(movieId);
    return await accountsRepository.merge(account);
  },
  removeFavourite: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);

    // check if movie is already in favourites array
    if (!account.favourites.includes(movieId)) {
      throw new Error(`Movie with ID ${movieId} is not in favourites`);
    }

    account.favourites = account.favourites.filter(favourite => favourite !== movieId);
    return await accountsRepository.merge(account);
  },
  getUserPlaylist: async (accountId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    return account.playlist;
  },
  addMovieToPlaylist: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);
    
    // check if movie is already in playlist array
    if (account.playlist.includes(movieId)) {
      throw new Error(`Movie with ID ${movieId} is already in playlist`);
    }
    
    account.playlist.push(movieId);
    return await accountsRepository.merge(account);
  },
  removeMovieFromPlaylist: async (accountId, movieId, { accountsRepository }) => {
    const account = await accountsRepository.get(accountId);

    // check if movie is already in playlist array
    if (!account.playlist.includes(movieId)) {
      throw new Error(`Movie with ID ${movieId} is not in playlist`);
    }

    account.playlist = account.playlist.filter(favourite => favourite !== movieId);
    return await accountsRepository.merge(account);
  },
  verifyToken:   async (token,{accountsRepository, tokenManager}) => {
    const decoded = await tokenManager.decode(token);
    const user = await accountsRepository.getByEmail(decoded.email);
    if (!user) {
        throw new Error('Bad token');
    }
    return user.email;
  }
};
