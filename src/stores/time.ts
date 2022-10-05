import { writable } from 'svelte/store';

export const standardTime = 1
export const bonusTime = 1

export const current = writable('east');
export const time = writable({
    east: {
        standard: standardTime,
        bonus: bonusTime
    },
    north: {
        standard: standardTime,
        bonus: bonusTime
    },
    west: {
        standard: standardTime,
        bonus: bonusTime
    },
    south: {
        standard: standardTime,
        bonus: bonusTime
    }
});

