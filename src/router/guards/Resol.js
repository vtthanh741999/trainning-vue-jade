import isUndefined from 'lodash-es/isUndefined'
import isArray from 'lodash-es/isArray'

const executeGuards = (guards, to, from, next) => {
    const guardsLeft = guards.slice(0)
    const nextGuard = guardsLeft.shift()
    if (isUndefined(nextGuard)) {
        next()
        return
    }
    nextGuard(to, from, (nextArg) => {
        if (isUndefined(nextArg)) {
            executeGuards(guardsLeft, to, from, next)
            return
        }
        next(nextArg)
    })
}

export const ResolveGuard = (guards) => {
    console.log('resol')
    if (!isArray(guards)) {
        throw new Error('Guards must be an array')
        console.log('array')
    }
    return (to, from, next) => {
        console.log(to)
        return executeGuards(guards, to, from, next)
    }
}