// @ts-ignore
import { Class } from 'meteor/akyma:astronomy'
// @ts-ignore
import {
  Amount,
  Avatar,
  Color,
  DateTime,
  Email,
  Enum,
  Image,
  Integer,
  Languages,
  Password,
  Percentage,
  Phone,
  Rating,
  Textarea,
  TextEditor,
  Url,
} from 'meteor/akyma:bk'

const BkUIDemoPeople = new Mongo.Collection('bk_ui_demo_people')
const BkUIDemoRecords = new Mongo.Collection('bk_ui_demo_records')

const DemoStatus = Enum.create({
  name: 'BkUIDemoStatus',
  identifiers: ['draft', 'review', 'published'],
})

const DemoAudience = Enum.create({
  name: 'BkUIDemoAudience',
  identifiers: ['internal', 'partners', 'public'],
})

const BkUIDemoPerson = Class.create({
  name: 'BkUIDemoPerson',
  collection: BkUIDemoPeople,
  secured: false,
  fields: {
    name: { type: String },
    email: { type: Email, optional: true },
    phone: { type: Phone, optional: true },
    roleLabel: { type: String, optional: true },
  },
  defaultName() {
    return this.name
  },
})

const BkUIDemoAddress = Class.create({
  name: 'BkUIDemoAddress',
  fields: {
    street: { type: String },
    city: {
      type: String,
      ui: {
        template: 'BkDatalistInput',
        props: {
          options: ['Bruxelles', 'Namur', 'Liège', 'Lille', 'Paris'],
        },
      },
    },
    country: {
      type: String,
      ui: {
        template: 'BkDropdown',
        props: {
          options: [
            { text: 'Belgium', value: 'BE' },
            { text: 'France', value: 'FR' },
            { text: 'Netherlands', value: 'NL' },
          ],
        },
      },
    },
  },
})

const BkUIDemoTask = Class.create({
  name: 'BkUIDemoTask',
  fields: {
    title: { type: String },
    isActive: { type: Boolean, default: true },
    estimate: { type: Integer, optional: true },
  },
})

const BkUIDemoRecord = Class.create({
  name: 'BkUIDemoRecord',
  collection: BkUIDemoRecords,
  secured: false,
  fields: {
    title: { type: String, description : 'Title of the demo record' },
    contactEmail: { type: Email },
    contactPhone: { type: Phone, optional: true },
    website: { type: Url, optional: true },
    password: { type: Password, optional: true },
    budget: { type: Amount, optional: true },
    attendees: { type: Integer, optional: true },
    progress: { type: Percentage, optional: true },
    satisfaction: { type: Rating, optional: true },
    accentColor: { type: Color, optional: true },
    publishedAt: { type: DateTime, optional: true },
    language: { type: Languages, optional: true },
    status: { type: DemoStatus, optional: true },
    audiences: { type: [DemoAudience], optional: true },
    shortDescription: { type: Textarea, optional: true },
    richDescription: { type: TextEditor, optional: true },
    keywords: { type: [String], optional: true },
    avatar: { type: Avatar, optional: true },
    coverImage: { type: Image, optional: true },
    owner: { type: BkUIDemoPerson, optional: true },
    reviewers: { type: [BkUIDemoPerson], optional: true },
    address: {
      type: BkUIDemoAddress,
      default() {
        return {
          street: 'Rue de la Demo 10',
          city: 'Namur',
          country: 'BE',
        }
      },
    },
    tasks: {
      type: [BkUIDemoTask],
      default() {
        return [
          { title: 'Kickoff', isActive: true, estimate: 2 },
          { title: 'Review', isActive: true, estimate: 1 },
        ]
      },
    },
    palette: {
      type: String,
      optional: true,
      ui: {
        template: 'BkActionableBadges',
        props: {
          options: [
            { value: 'red' },
            { value: 'orange' },
            { value: 'green' },
            { value: 'blue' },
          ],
        },
      },
    },
    approvalMode: {
      type: String,
      optional: true,
      ui: {
        template: 'BkDropdown',
        props: {
          options: [
            { text: 'Manual review', value: 'manual' },
            { text: 'Automatic approval', value: 'automatic' },
            { text: 'Hybrid flow', value: 'hybrid' },
          ],
        },
      },
    },
  },
  defaultName() {
    return this.title || 'Untitled demo record'
  },
})

const demoPeople = [
  new BkUIDemoPerson({ _id: 'p1', name: 'Alice Martin', email: 'alice@example.com', phone: '+32470000001', roleLabel: 'Lead' }),
  new BkUIDemoPerson({ _id: 'p2', name: 'Benoit Simon', email: 'benoit@example.com', phone: '+32470000002', roleLabel: 'Reviewer' }),
  new BkUIDemoPerson({ _id: 'p3', name: 'Claire Dupont', email: 'claire@example.com', phone: '+32470000003', roleLabel: 'Editor' }),
]

const createBkUIDemoRecord = (overrides = {}) => new BkUIDemoRecord({
  title: 'BkUI Demo Workspace',
  contactEmail: 'demo@akyma.dev',
  contactPhone: '+32470112233',
  website: 'https://akyma.dev',
  password: 'secret-demo',
  budget: 2450.75,
  attendees: 24,
  progress: 72,
  satisfaction: 4,
  accentColor: '#1976d2',
  publishedAt: new Date('2026-05-18T09:30:00'),
  language: 'fr',
  status: 'review',
  audiences: ['internal', 'partners'],
  shortDescription: 'Demonstration record covering a broad range of BkUI field types.',
  richDescription: '<p><strong>BkUI playground</strong> with nested models, standalone widgets and local table data.</p>',
  keywords: ['meteor', 'vue', 'quasar'],
  owner: demoPeople[0]._id,
  reviewers: [demoPeople[1]._id, demoPeople[2]._id],
  palette: 'blue',
  approvalMode: 'hybrid',
  ...overrides,
}, { cast: true })

const createBkUIDemoTableRows = () => [
  createBkUIDemoRecord({ _id: 'r1', title: 'Client onboarding', status: 'draft', progress: 18, satisfaction: 2, palette: 'red', approvalMode: 'manual' }),
  createBkUIDemoRecord({ _id: 'r2', title: 'Product review', status: 'review', progress: 56, satisfaction: 4, palette: 'orange', approvalMode: 'hybrid' }),
  createBkUIDemoRecord({ _id: 'r3', title: 'Release communication', status: 'published', progress: 100, satisfaction: 5, palette: 'green', approvalMode: 'automatic' }),
]

export {
  BkUIDemoAddress,
  BkUIDemoPerson,
  BkUIDemoRecord,
  BkUIDemoTask,
  DemoAudience,
  DemoStatus,
  createBkUIDemoRecord,
  createBkUIDemoTableRows,
  demoPeople,
}