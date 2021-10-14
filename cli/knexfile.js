module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        migrations: {
            directory: `result/database/migrations`,
        },
        seeds: {
            directory: `result/database/seeds`,
        },
        useNullAsDefault: true,
    }

};
