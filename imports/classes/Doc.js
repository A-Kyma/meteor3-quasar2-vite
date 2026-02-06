// @ts-ignore
import {Class} from 'meteor/akyma:astronomy'

const Docs = new Mongo.Collection('docs')
const Doc = Class.create({
    name: 'Doc',
    collection: Docs,
    secured: false,
    fields: {
        text: {
            type: String,
            ui: { class: "w-75"}
        }
    }
})

export default Doc