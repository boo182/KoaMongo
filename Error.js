//Error handling file

import Boom from 'boom';

export const errorQuery = Boom.badRequest('Invalid Query');
export const errorUnauthorized = Boom.unauthorized('Permission Denied');