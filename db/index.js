const Sequelize = require ('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_db');

const Product = conn.define('product', {
    number: Sequelize.INTEGER
})

const Category = conn.define('category', {
    number: Sequelize.INTEGER
})

Product.belongsTo(Category, { onDelete: 'cascade' });
//Product.belongsTo(Category);
Category.hasMany(Product);

const sync = () => {
    return conn.sync({ force: true });
}

const seed = () => {
    return Promise.all([
        Product.create({ number: 101 }),
        Product.create({ number: 102 }),
        Product.create({ number: 103 }),
        Product.create({ number: 104 }),
        Category.create({ number: 201 }),
        Category.create({ number: 202 }),
        Category.create({ number: 203 })
    ])
    .then(([ n101, n102, n103, n104, n201, n202, n203 ]) => {
        return Promise.all([
            n101.setCategory(n201),
            n102.setCategory(n201),
            n103.setCategory(n202),
            n104.setCategory(n203),
        ])
    })
}

module.exports = {
    sync,
    seed,
    models: {
        Product,
        Category
    }
}

