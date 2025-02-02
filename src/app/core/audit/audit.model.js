'use strict';

const mongoose = require('mongoose'),
	getterPlugin = require('../../common/mongoose/getter.plugin'),
	paginatePlugin = require('../../common/mongoose/paginate.plugin'),
	containsSearchPlugin = require('../../common/mongoose/contains-search.plugin'),
	deps = require('../../../dependencies'),
	util = deps.utilService;

/**
 * Schema Declaration
 *
 * @typed {mongoose.Schema<import('./types').AuditDocument, import('./types').AuditModel>}
 * @type {mongoose.Schema}
 */
const AuditSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now,
		get: util.dateParse
	},
	message: { type: String },
	audit: {
		auditType: { type: String },
		action: { type: String },
		actor: { type: Object },
		object: { type: mongoose.Schema.Types.Mixed },
		userSpec: {
			browser: { type: String },
			os: { type: String }
		},
		masqueradingUser: { type: String }
	}
});

AuditSchema.plugin(getterPlugin);
AuditSchema.plugin(paginatePlugin);
AuditSchema.plugin(containsSearchPlugin, {
	fields: ['message', 'audit.auditType', 'audit.action']
});

/**
 * Index declarations
 */

// Created datetime index, expires after 180 days
AuditSchema.index({ created: -1 }, { expireAfterSeconds: 15552000 });

// Audit Type index
AuditSchema.index({ 'audit.auditType': 1 });

// Audit Action index
AuditSchema.index({ 'audit.action': 1 });

// actor._id index
AuditSchema.index({ 'audit.actor._id': 1 });

// actor.name index
AuditSchema.index({ 'audit.actor.name': 1 });

// Audit message index
AuditSchema.index({ message: 1 });

/*****************
 * Lifecycle hooks
 *****************/

/*****************
 * Static Methods
 *****************/

/**
 * Register the Schema with Mongoose
 */
/**
 *
 * @type {import('./types').AuditModel}
 */
const Audit = mongoose.model('Audit', AuditSchema, 'audit');

module.exports = Audit;
