const ROW_BASE_URL = 'http://dev.hajjtafweej.net'
const BASE_URL = `${ROW_BASE_URL}/api`

// ANALYtiCS
export const login = `${BASE_URL}/auth/login`
export const me = `${BASE_URL}/auth/me`
export const getDashboardBatches = `${BASE_URL}/get-murshed-or-office-batches`
export const register = `${BASE_URL}/auth/register`
export const getGuides = `${BASE_URL}/auth/office-users`
export const assignBatch = `${BASE_URL}/assign-batch`
export const removeGuide = `${BASE_URL}/auth/delete-user`
export const getGuideBatches = `${BASE_URL}/get-user-batches`

// INSPECT
export const getCampReadiness = `${BASE_URL}/get-tafweej-requirement`
export const updateReadiness = `${BASE_URL}/store-tafweej-requirement`
export const updateResidence = `${BASE_URL}/store-mashaer-residence`
export const getMashaerResidence = `${BASE_URL}/get-mashaer-residence`
export const getOfficeBatches = `http://dashboard.hajjtafweej.net/schedule/get-office-batches/`