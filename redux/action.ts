const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD = 'ADD';

export function addText(text) {
    return { type: ADD, text };
}