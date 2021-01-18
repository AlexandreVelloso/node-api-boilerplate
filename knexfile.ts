import appRoot from 'app-root-path';

const database = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: `${appRoot}/database/dev.sqlite`,
        },
        migrations: {
            directory: `${appRoot}/database/migrations`,
        },
        seeds: {
            directory: `${appRoot}/database/seeds`,
        },
        useNullAsDefault: true,
    },

    test: {
        client: 'sqlite3',
        connection: ':memory:',
        migrations: {
            directory: `${appRoot}/database/migrations`,
        },
        seeds: {
            directory: `${appRoot}/database/seeds`,
        },
        useNullAsDefault: true,
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }

};

export = database;