import * as Correlation from 'express-correlation-id'
import { getLogger } from './logger';

import memoize = require('lodash.memoize');

const logger = memoize(() => getLogger())

export const correlationAwareService = () => {
	const correlationId = Correlation.getId()

	logger().info({correlationId, status: 'We got it!'})

	return {res: `Hi, ${correlationId}`, ok: true}
}
