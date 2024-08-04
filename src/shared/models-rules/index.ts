import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
const USER = {
  id: 'edb8d284-b04e-45b7-bfc1-4fbf9e23f9d1',
  name: 'User',
};
export function getUserIdFromRequest(request: AppRequest): string {
  if (request.user) return request.user.id;
  return USER.id;
}
