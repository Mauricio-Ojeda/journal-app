import { types } from "../types/types"

export const startLoading = () => ({
    type: types.uiStartLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});

export const startNewEntry = () => ({
    type: types.uiStartNewEntry
});

export const finishNewEntry = () => ({
    type: types.uiFinishNewEntry
});