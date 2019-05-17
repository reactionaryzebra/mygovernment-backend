import {merge} from 'lodash'

import userResolvers from './user'
import repResolvers from './representative'

const resolvers = merge(userResolvers, repResolvers)

export default resolvers
