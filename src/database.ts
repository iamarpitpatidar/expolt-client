import loki from 'lokijs'

const db = new loki('expolt')
const articles = db.addCollection('articles')
const weather = db.addCollection('weather')
const lastUpdate = db.addCollection('lastUpdate')

export { articles, weather, lastUpdate }
