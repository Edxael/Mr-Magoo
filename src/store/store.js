import { createStoreon } from 'storeon'
import { persistState } from '@storeon/localstorage'

import auth from './auth'
import travel from './travel'

export const store = createStoreon([auth, travel, persistState(['auth', 'travel'])])
