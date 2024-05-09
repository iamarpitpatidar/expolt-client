import loki from 'lokijs'

const db = new loki('expolt')
const articles = db.addCollection('articles')
const lastUpdate = db.addCollection('lastUpdate')

export { articles, lastUpdate }
