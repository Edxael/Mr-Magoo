import { createStoreon } from 'storeon'
import { persistState } from '@storeon/localstorage'

import auth from './auth'
import travel from './travel'
import assignments from './assignments'

export const store = createStoreon([auth, travel, assignments, persistState(['auth', 'travel', 'assignments'])])
