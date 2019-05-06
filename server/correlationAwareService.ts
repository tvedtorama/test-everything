import * as Correlation from 'express-correlation-id'
import { getLogger } from './logger';

import memoize = require('lodash.memoize');
import winston = require('winston');

const logger = memoize(() => getLogger())

export const correlationAwareService = () => {
	const correlationId = Correlation.getId()

	// test this - verify that stuff comes out.
	// Enable WIQ to create streaming logs with the correlation_context and redux status contenxt.

	logger().log(<winston.LogEntry>{level: "hei", correlationId, message: 'We got it!', hublaBubla: true})

	return {res: `Hi, ${correlationId}`, ok: true}
}
